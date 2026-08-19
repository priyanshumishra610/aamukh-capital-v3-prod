/**
 * Aamukh Capital - Angel Investor Community Form
 *
 * First-time setup
 * 1. In this Apps Script project, run createSheetAndHeaders from the editor
 *    (select the function, then click Run). Approve permissions when asked.
 * 2. Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 3. Copy the web app URL into lib/community-form.ts or
 *    NEXT_PUBLIC_GOOGLE_SCRIPT_URL.
 * 4. After any edit, deploy a new version.
 */

var SHEET_NAME = 'Community Onboarding';
var SPREADSHEET_ID = ''; // filled automatically by createSheetAndHeaders if empty

var HEADER_BG = '#4C6BE8';
var HEADER_FG = '#FFFFFF';

var HEADERS = [
  'Timestamp',
  'Full Name',
  'Email',
  'Phone',
  'City',
  'LinkedIn',
  'Designation / Organization',
  'Years of Experience',
  'Invested Before',
  'Number of Startups',
  'Preferred Stage',
  'Ticket Size',
  'Investment Sectors',
  'Investment Sectors Other',
  'Expertise Sectors',
  'Expertise Other',
  'Expertise Description',
  'Mentorship Interest',
  'Mentorship Areas',
  'Mentorship Areas Other',
  'Mentorship Startup Types',
  'Community Participation',
  'Participation Other',
  'Pitch Sessions',
  'Introductions',
  'Evaluation Criteria',
  'Geographies',
  'Community Gain',
  'Anything Else',
  'How They Heard',
  'How They Heard Other',
  'Consent',
  'Source',
];

var FIELD_KEYS = [
  'timestamp',
  'fullName',
  'email',
  'phone',
  'city',
  'linkedin',
  'designation',
  'yearsExperience',
  'investedBefore',
  'startupCount',
  'preferredStage',
  'ticketSize',
  'investmentSectors',
  'investmentSectorsOther',
  'expertiseSectors',
  'expertiseSectorsOther',
  'expertiseDescription',
  'mentorshipInterest',
  'mentorshipAreas',
  'mentorshipAreasOther',
  'mentorshipStartupTypes',
  'participation',
  'participationOther',
  'pitchSessions',
  'introductions',
  'evaluationCriteria',
  'geographies',
  'communityGain',
  'anythingElse',
  'hearAbout',
  'hearAboutOther',
  'consent',
  'source',
];

/**
 * Adds an Aamukh Capital menu to the bound Google Sheet.
 * Reload the spreadsheet after saving this script.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Aamukh Capital')
    .addItem('Set up sheet and headers', 'createSheetAndHeaders')
    .addToUi();
}

/**
 * Run this once from the Apps Script editor or the Aamukh Capital menu.
 * Creates the spreadsheet (if needed), the response sheet, and styled header row.
 */
function createSheetAndHeaders() {
  var ss = getOrCreateSpreadsheet_();
  var sheet = getOrCreateSheet_(ss);
  writeHeaders_(sheet);
  sheet.autoResizeColumns(1, HEADERS.length);

  Logger.log('Sheet ready: ' + ss.getUrl());
  Logger.log('Spreadsheet ID: ' + ss.getId());
  Logger.log('Tab: ' + SHEET_NAME);

  return {
    spreadsheetId: ss.getId(),
    spreadsheetUrl: ss.getUrl(),
    sheetName: SHEET_NAME,
    headers: HEADERS.length,
  };
}

function doGet(e) {
  try {
    var action = param_(e, 'action');

    if (action === 'setup') {
      return json_({ result: 'success', setup: createSheetAndHeaders() });
    }

    if (action === 'responses') {
      return json_({ result: 'success', responses: getAllResponses() });
    }

    return json_({
      result: 'ok',
      form: 'Aamukh Capital Community Onboarding',
      endpoints: {
        submit: 'POST JSON body to this URL',
        responses: '?action=responses',
        setup: '?action=setup',
      },
    });
  } catch (error) {
    return json_({ result: 'error', error: String(error) });
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    var data = fetchFormData(e);
    if (!data.fullName && !data.email) {
      throw new Error('Form payload is empty. Expected JSON fields from the community form.');
    }

    var saved = saveFormResponse(data);

    return json_({
      result: 'success',
      row: saved.row,
      email: data.email || '',
    });
  } catch (error) {
    return json_({ result: 'error', error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Reads the incoming community form payload.
 * Accepts JSON (text/plain or application/json) and form-urlencoded fields.
 */
function fetchFormData(e) {
  var raw = {};

  if (e && e.postData && e.postData.contents) {
    var contents = String(e.postData.contents);
    try {
      raw = JSON.parse(contents);
    } catch (err) {
      raw = (e.parameter && Object.keys(e.parameter).length) ? e.parameter : parseQueryString_(contents);
    }
  } else if (e && e.parameter) {
    raw = e.parameter;
  }

  return normalizeFormData_(raw);
}

/**
 * Appends one normalized form response to the sheet.
 * Creates the sheet and headers first if they are missing.
 */
function saveFormResponse(data) {
  var ss = getOrCreateSpreadsheet_();
  var sheet = getOrCreateSheet_(ss);
  writeHeaders_(sheet);

  var rowValues = rowFromData_(data);
  sheet.appendRow(rowValues);

  var row = sheet.getLastRow();
  sheet.getRange(row, 1, 1, HEADERS.length).setVerticalAlignment('top').setWrap(true);

  return { row: row, values: rowValues };
}

/**
 * Returns every saved community form response as objects.
 */
function getAllResponses() {
  var ss = getOrCreateSpreadsheet_();
  var sheet = getOrCreateSheet_(ss);
  writeHeaders_(sheet);

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  var responses = [];

  for (var i = 0; i < values.length; i++) {
    var item = {};
    for (var c = 0; c < FIELD_KEYS.length; c++) {
      item[FIELD_KEYS[c]] = values[i][c];
    }
    item.row = i + 2;
    responses.push(item);
  }

  return responses;
}

function normalizeFormData_(raw) {
  raw = raw || {};
  var data = {};

  for (var i = 0; i < FIELD_KEYS.length; i++) {
    var key = FIELD_KEYS[i];
    data[key] = stringifyValue_(raw[key]);
  }

  if (!data.timestamp) {
    data.timestamp = new Date().toISOString();
  }
  if (!data.source) {
    data.source = 'aamukh-capital-website';
  }
  if (data.consent === 'true' || data.consent === 'TRUE') {
    data.consent = 'Yes';
  }
  if (data.consent === 'false' || data.consent === 'FALSE') {
    data.consent = 'No';
  }

  return data;
}

function stringifyValue_(value) {
  if (value === null || value === undefined) return '';
  if (Object.prototype.toString.call(value) === '[object Array]') {
    return value.join('; ');
  }
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value).trim();
}

function rowFromData_(data) {
  data = data || {};
  var row = [];
  for (var i = 0; i < FIELD_KEYS.length; i++) {
    row.push(data[FIELD_KEYS[i]] || '');
  }
  return row;
}

function writeHeaders_(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  var existing = headerRange.getValues()[0];

  if (existing[0] !== HEADERS[0] || existing.length < HEADERS.length) {
    headerRange.setValues([HEADERS]);
  }

  headerRange
    .setFontWeight('bold')
    .setFontColor(HEADER_FG)
    .setBackground(HEADER_BG)
    .setHorizontalAlignment('center')
    .setWrap(true);

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 36);
}

function getOrCreateSpreadsheet_() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (err) {}

  var created = SpreadsheetApp.create('Aamukh Capital Community Onboarding');
  Logger.log('Created spreadsheet. Set SPREADSHEET_ID to: ' + created.getId());
  Logger.log(created.getUrl());
  return created;
}

function getOrCreateSheet_(ss) {
  ss = ss || getOrCreateSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function param_(e, name) {
  if (!e || !e.parameter) return '';
  return e.parameter[name] || '';
}

function parseQueryString_(contents) {
  var out = {};
  var pairs = String(contents).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    if (!pair) continue;
    var parts = pair.split('=');
    var key = decodeURIComponent((parts[0] || '').replace(/\+/g, ' '));
    var value = decodeURIComponent((parts.slice(1).join('=') || '').replace(/\+/g, ' '));
    out[key] = value;
  }
  return out;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

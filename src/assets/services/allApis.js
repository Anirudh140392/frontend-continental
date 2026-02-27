const API_CONFIG = {
  BASE_URL: "https://react-api-script.onrender.com",
};

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================
export const AUTH_APIS = {
  LOGIN_BOWLERS: {
    url: "/bowlers/login",
    method: "POST",
    label: "Bowler Login",
    description: "Authenticate user (bowler) with username and password",
    params: {
      username: "string",
      password: "string",
    },
    response: {
      token: { access: "string" },
      username: "string",
    },
  },

  LOGIN_APP: {
    url: "/login/",
    method: "POST",
    label: "App Login",
    description: "Authenticate user via app login (alternative endpoint seen in code)",
    params: { username: "string", password: "string" },
  },

  REGISTER: {
    url: "/app/register/",
    method: "POST",
    label: "User Registration",
    description: "Register a new user account",
    params: {
      first_name: "string",
      last_name: "string",
      username: "string",
      password: "string",
      confirm_password: "string",
    },
  },

  CSRF_TOKEN: {
    url: "/csrfToken/",
    method: "GET",
    label: "Get CSRF Token",
    description: "Retrieve CSRF token for secure requests",
  },
};

// ============================================
// CAMPAIGN MANAGEMENT ENDPOINTS
// ============================================
export const CAMPAIGN_APIS = {
  GET_CAMPAIGNS: {
    url: "/continental/campaign",
    method: "GET",
    label: "Get Campaigns",
    description: "Fetch campaigns for a platform within a date range",
    params: {
      start_date: "string (YYYY-MM-DD)",
      end_date: "string (YYYY-MM-DD)",
      platform: "string (Blinkit, Zepto, Swiggy, Amazon)",
      brand_name: "string (optional)",
    },
    response: { data: "object | array - campaign list and metrics" },
  },

  GET_CAMPAIGN_GRAPH: {
    url: "/continental/campaign_graph",
    method: "GET",
    label: "Get Campaign Graph",
    description: "Fetch time-series/trend data for a single campaign",
    params: {
      start_date: "string",
      end_date: "string",
      platform: "string",
      campaign_id: "string|number",
      brand_name: "string (optional)",
    },
    response: { data: "object - timeseries points and aggregates" },
  },

  PLAY_PAUSE_CAMPAIGN: {
    url: "/continental/play-pause",
    method: "PUT",
    label: "Play/Pause Campaign",
    description: "Toggle campaign status (play/pause) by id",
    body: {
      platform: "string",
      campaign_id: "string|number",
      status: "string (ACTIVE|STOPPED|ON_HOLD) or numeric",
    },
    response: { message: "string", new_status: "string|number" },
  },
};

// ============================================
// WALLET / NAVBAR ENDPOINTS
// ============================================
export const WALLET_APIS = {
  GET_WALLET_BALANCE: {
    url: "/continental/wallet_balance",
    method: "GET",
    label: "Get Wallet Balance",
    description: "Fetch wallet balance for a platform",
    params: { platform: "string" },
    response: { data: { wallet_balance: "number" } },
  },
};

// ============================================
// BOWLERS / KEYWORDS / PRODUCT APIS
// ============================================
export const BOWLERS_APIS = {
  KEYWORD_SEARCH_PAGE: {
    url: "/bowlers/keyword-search-term-page",
    method: "GET",
    label: "Keyword Search Term Page",
    description: "Search / paging endpoint for search term insights",
    params: { start_date: "string", end_date: "string", platform: "string", /* others */ },
    response: { data: "object" },
  },
};

export const PRODUCT_APIS = {
  PRODUCT_ANALYTICS: {
    url: "/continental/product-analytics",
    method: "GET",
    label: "Product Analytics",
    description: "Fetch product-level analytics for a platform and date range",
    params: { platform: "string", start_date: "string", end_date: "string" },
    response: { data: "object" },
  },
};

// ============================================
// AD GROUPS / ADGROUP MANAGEMENT
// ============================================
export const ADGROUP_APIS = {
  GET_ADGROUPS: {
    url: "/continental/adgroups",
    method: "GET",
    label: "Get AdGroups",
    description: "Fetch ad groups for campaigns",
    params: { start_date: "string", end_date: "string", platform: "string" },
    response: { data: "array" },
  },

  TOGGLE_AD_GROUP: {
    url: "/continental/toggle_ad_group",
    method: "PUT",
    label: "Toggle AdGroup",
    description: "Toggle ad group status via query params",
    params: { campaign_type: "string", ad_group_id: "string|number", platform: "string", campaign_id: "string|number" },
    response: { message: "string", new_status: "number" },
  },

  UPDATE_AD_GROUP_NAME: {
    url: "/bowlers/update_ad_group_name",
    method: "PUT",
    label: "Update AdGroup Name",
    description: "Update ad group name via query params",
    params: { platform: "string", ad_group_id: "string|number", campaign_type: "string", campaign_id: "string|number", new_name: "string" },
    response: { adGroups: "object" },
  },
};

// ============================================
// SMART CONTROL / RULES ENGINE
// ============================================
export const RULES_APIS = {
  METADATA_CAMPAIGNS: {
    url: "/rules_engine/metadata/campaigns/",
    method: "GET",
    label: "Rules Engine - Campaigns Metadata",
    description: "Fetch campaigns metadata for rules (query brand_id & platform)",
    params: { brand_id: "string|number", platform: "string" },
    response: { data: "object" },
  },

  METADATA_CAMPAIGN_BY_ID: {
    url: "/rules_engine/metadata/campaigns/{campaignId}/",
    method: "GET",
    label: "Rules Engine - Campaign Metadata By ID",
    description: "Fetch metadata for a single campaign id",
    params: { campaignId: "string|number", brand_id: "string|number", platform: "string" },
    response: { data: "object" },
  },

  CREATE_RULE: {
    url: "/rules_engine/rules",
    method: "POST",
    label: "Create Rule",
    description: "Create a new automation rule",
    body: { /* rule payload - see addRuleCreator.jsx for fields */ },
    response: { rule_id: "string|number" },
  },

  DISPLAY_RULES: {
    url: "/continental/displayrules",
    method: "GET",
    label: "Display Rules",
    description: "List rules for a platform",
    params: { platform: "string" },
    response: { data: "array" },
  },

  PLAY_PAUSE_RULE: {
    url: "/continental/play-pause-rule",
    method: "PUT",
    label: "Play/Pause Rule",
    description: "Toggle rule status by rule_id and platform",
    params: { rule_id: "string|number", platform: "string" },
    response: { new_status: "number" },
  },

  DELETE_RULE: {
    url: "/continental/delete-rule",
    method: "DELETE",
    label: "Delete Rule",
    description: "Delete a rule by id (typically only inactive ones)",
    params: { rule_id: "string|number", platform: "string" },
    response: { message: "string" },
  },
};

// ============================================
// HISTORY
// ============================================
export const HISTORY_APIS = {
  GET_HISTORY: {
    url: "/continental/history",
    method: "GET",
    label: "Get History",
    description: "Fetch history/audit logs for a platform",
    params: { platform: "string" },
    response: { data: "array" },
  },
};

// Export a single combined object if needed
export default {
  API_CONFIG,
  AUTH_APIS,
  CAMPAIGN_APIS,
  WALLET_APIS,
  BOWLERS_APIS,
  PRODUCT_APIS,
  ADGROUP_APIS,
  RULES_APIS,
  HISTORY_APIS,
};

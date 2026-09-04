// leadsService.js
//
// A mock REST API layer for the FieldQuote app.
//
// There is no real backend behind this demo, so instead of calling `fetch()`
// against a live server, every function here simulates one: it goes through
// an async request/response cycle, returns data shaped like a JSON API
// response ({ data, status, ok }), and throws an Error carrying an HTTP-style
// `status` code (404, etc.) on failure — the same contract a real fetch-based
// service module would expose to the rest of the app. That means the calling
// components (see FieldQuote_Dashboard.jsx) are written exactly as they would
// be against a real backend: they await a call, branch on success/failure,
// and don't know or care that "the network" is actually localStorage.
//
// Swapping this for a real backend later means replacing the bodies of these
// functions with `fetch('/api/leads', ...)` calls — the calling code would
// not need to change.

const STORAGE_KEY = "fieldquote.leads";
const NETWORK_DELAY_MS = 350; // simulated latency, so loading states are real

const SEED_LEADS = [
  {
    id: "WF-2201",
    name: "Marisol Trent",
    address: "482 Birchwood Ln",
    time: "9:00 AM",
    service: "Pest",
    status: "Scheduled",
  },
  {
    id: "WF-2202",
    name: "Dan Okafor",
    address: "17 Ridgecrest Dr",
    time: "10:30 AM",
    service: "Lawn",
    status: "Proposal",
    proposalItems: [
      { id: "seed-2a", description: "Lawn treatment, 1/4 acre", price: 165 },
    ],
    proposalTotal: 165,
  },
  {
    id: "WF-2203",
    name: "Priya Iyer",
    address: "930 Elm Court",
    time: "12:15 PM",
    service: "HVAC",
    status: "Sold",
    proposalItems: [
      { id: "seed-3a", description: "System inspection", price: 90 },
      { id: "seed-3b", description: "Filter replacement", price: 50 },
    ],
    proposalTotal: 140,
    paymentMethod: "Credit Card",
    signatureName: "Priya Iyer",
  },
  {
    id: "WF-2204",
    name: "Wes Aldridge",
    address: "56 Foxhollow Rd",
    time: "TBD",
    service: "Pest",
    status: "New",
  },
];

function loadLeads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_LEADS));
      return SEED_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_LEADS;
  }
}

function persistLeads(leads) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

// Simulates network latency so the UI's loading states have something real
// to show, the same as they would waiting on an actual HTTP round trip.
function withDelay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));
}

function jsonResponse(data, status = 200) {
  return { data, status, ok: status >= 200 && status < 300 };
}

function httpError(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}

/** GET /leads */
export async function getLeads() {
  const leads = loadLeads();
  return withDelay(jsonResponse(leads, 200));
}

/** GET /leads/:id */
export async function getLead(id) {
  const leads = loadLeads();
  const lead = leads.find((l) => l.id === id);
  if (!lead) {
    await withDelay(null);
    throw httpError(`Lead ${id} not found`, 404);
  }
  return withDelay(jsonResponse(lead, 200));
}

/** POST /leads */
export async function createLead(payload) {
  const leads = loadLeads();
  const id = "WF-" + (2200 + leads.length + 1);
  const newLead = {
    id,
    name: payload.name,
    address: payload.address || "—",
    time: "TBD",
    service: payload.service,
    status: "New",
    price: payload.price || 0,
    phone: payload.phone || "—",
    email: payload.email || "—",
  };
  persistLeads([...leads, newLead]);
  return withDelay(jsonResponse(newLead, 201));
}

/** PUT/PATCH /leads/:id */
export async function updateLead(id, fields) {
  const leads = loadLeads();
  let updatedLead = null;
  const next = leads.map((lead) => {
    if (lead.id !== id) return lead;
    updatedLead = { ...lead, ...fields };
    return updatedLead;
  });
  if (!updatedLead) {
    await withDelay(null);
    throw httpError(`Lead ${id} not found`, 404);
  }
  persistLeads(next);
  return withDelay(jsonResponse(updatedLead, 200));
}

/** DELETE /leads/:id */
export async function deleteLead(id) {
  const leads = loadLeads();
  if (!leads.some((l) => l.id === id)) {
    await withDelay(null);
    throw httpError(`Lead ${id} not found`, 404);
  }
  persistLeads(leads.filter((l) => l.id !== id));
  return withDelay(jsonResponse(null, 204));
}

/** Convenience wrapper — PATCH /leads/:id { status } */
export async function changeLeadStatus(id, status) {
  return updateLead(id, { status });
}

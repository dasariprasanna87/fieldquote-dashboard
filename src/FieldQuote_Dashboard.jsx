import { useState } from "react";
import {
  Trash2,
  MapPin,
  Clock,
  Plus,
  ChevronLeft,
  Bug,
  Leaf,
  Wrench,
  CheckCircle2,
} from "lucide-react";

const COLORS = {
  forest: "#1F3A2E",
  moss: "#3E6B52",
  sand: "#F3EEE1",
  gold: "#C9A227",
  paper: "#FBFAF5",
  ink: "#20241F",
  line: "#D8D2BF",
  fade: "#7C8A7F",
};

const SERVICE_ICON = { Pest: Bug, Lawn: Leaf, HVAC: Wrench };

const INITIAL_LEADS = [
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
    status: "Quoted",
  },
  {
    id: "WF-2203",
    name: "Priya Iyer",
    address: "930 Elm Court",
    time: "12:15 PM",
    service: "HVAC",
    status: "Won",
  },
  {
    id: "WF-2204",
    name: "Wes Aldridge",
    address: "56 Foxhollow Rd",
    time: "2:00 PM",
    service: "Pest",
    status: "Scheduled",
  },
];

const STATUS_STYLE = {
  Scheduled: { bg: COLORS.paper, fg: COLORS.moss, border: COLORS.moss },
  Quoted: { bg: COLORS.paper, fg: COLORS.gold, border: COLORS.gold },
  Won: { bg: COLORS.forest, fg: COLORS.sand, border: COLORS.forest },
};

function Stamp({ status }) {
  const s = STATUS_STYLE[status];
  return (
    <div
      className="px-3 py-1 text-xs font-bold uppercase tracking-wider"
      style={{
        color: s.fg,
        backgroundColor: s.bg,
        border: `2px solid ${s.border}`,
        borderRadius: 4,
        transform: "rotate(-3deg)",
        fontFamily: "'Space Grotesk', sans-serif",
        letterSpacing: "0.08em",
      }}
    >
      {status}
    </div>
  );
}

function TicketCard({ lead, onDelete, onStatusChange, onClick }) {
  const Icon = SERVICE_ICON[lead.service];
  return (
    <div
      className="relative flex overflow-hidden"
      style={{
        backgroundColor: COLORS.paper,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 10,
      }}
      onClick={onClick}
    >
      {/* left strip */}
      <div
        className="flex flex-col items-center justify-center gap-1 px-3 py-4 relative"
        style={{ backgroundColor: COLORS.forest, minWidth: 84 }}
      >
        <Icon size={20} color={COLORS.sand} />
        <span
          className="text-[11px] font-semibold"
          style={{
            color: COLORS.sand,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {lead.id}
        </span>
      </div>

      {/* perforation */}
      <div
        className="relative w-0"
        style={{ borderLeft: `2px dashed ${COLORS.line}` }}
      >
        <div
          className="absolute rounded-full"
          style={{
            backgroundColor: COLORS.sand,
            width: 14,
            height: 14,
            top: -7,
            left: -8,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            backgroundColor: COLORS.sand,
            width: 14,
            height: 14,
            bottom: -7,
            left: -8,
          }}
        />
      </div>

      {/* body */}
      <div className="flex flex-1 items-center justify-between gap-4 px-5 py-4">
        <div>
          <p
            className="font-bold text-base"
            style={{
              color: COLORS.ink,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {lead.name}
          </p>
          <div
            className="flex items-center gap-3 mt-1 text-sm"
            style={{ color: COLORS.fade }}
          >
            <span className="flex items-center gap-1">
              <MapPin size={13} /> {lead.address}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {lead.time}
            </span>
            {lead.price && (
              <p
                className="text-sm font-semibold mt-1"
                style={{ color: COLORS.forest }}
              >
                ${lead.price}
              </p>
            )}
          </div>
        </div>
        <Stamp status={lead.status} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(lead.id);
          }}
        >
          Delete
        </button>
        <select
          value={lead.status}
          onChange={(e) => {
            e.stopPropagation();
            onStatusChange(lead.id, e.target.value);
          }}
        >
          {" "}
          <option>Scheduled</option> <option>Quoted</option>{" "}
          <option>Won</option>{" "}
        </select>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div
      className="flex-1 px-5 py-4"
      style={{
        backgroundColor: COLORS.paper,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 10,
      }}
    >
      <p
        className="text-3xl font-bold"
        style={{
          color: COLORS.forest,
          fontFamily: "'IBM Plex Mono', monospace",
        }}
      >
        {value}
      </p>
      <p
        className="text-xs uppercase tracking-wide mt-1"
        style={{ color: COLORS.fade }}
      >
        {label}
      </p>
    </div>
  );
}

function NewQuoteForm({ onBack, onSave }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    service: "Pest",
    price: "",
    phone: "",
    email: "",
  });

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm font-semibold mb-5"
        style={{ color: COLORS.moss }}
      >
        <ChevronLeft size={16} /> Back to route
      </button>

      <h2
        className="text-2xl font-bold mb-5"
        style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        New Lead
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Customer name
          </label>
          <input
            value={form.name}
            onChange={update("name")}
            placeholder="e.g. Jordan Reyes"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          />
        </div>
        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Phone number
          </label>
          <input
            value={form.phone}
            onChange={update("phone")}
            placeholder="e.g. (555) 123-4567"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          />
        </div>
        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Email id
          </label>
          <input
            value={form.email}
            onChange={update("email")}
            placeholder="e.g. jordan.reyes@example.com"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          />
        </div>

        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Service address
          </label>
          <input
            value={form.address}
            onChange={update("address")}
            placeholder="e.g. 12 Maple St"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          />
        </div>

        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Service type
          </label>
          <select
            value={form.service}
            onChange={update("service")}
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          >
            <option>Pest</option>
            <option>Lawn</option>
            <option>HVAC</option>
          </select>
        </div>

        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Estimated price ($)
          </label>
          <input
            value={form.price}
            onChange={update("price")}
            placeholder="e.g. 240"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          />
        </div>

        <button
          onClick={() => form.name && onSave(form)}
          className="mt-2 flex items-center justify-center gap-2 py-3 font-bold text-sm uppercase tracking-wide"
          style={{
            backgroundColor: COLORS.gold,
            color: COLORS.forest,
            borderRadius: 8,
          }}
        >
          <CheckCircle2 size={17} /> Save Quote
        </button>
      </div>
    </div>
  );
}
function LeadDetailForm({ lead, onBack, onSave }) {
  const [form, setForm] = useState({
    name: lead.name || "",
    address: lead.address || "",
    service: lead.service || "Pest",
    price: lead.price || "",
    phone: lead.phone || "",
    email: lead.email || "",
  });

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm font-semibold mb-5"
        style={{ color: COLORS.moss }}
      >
        <ChevronLeft size={16} /> Back to route
      </button>

      <h2
        className="text-2xl font-bold mb-5"
        style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        New Lead
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Customer name
          </label>
          <input
            value={form.name}
            onChange={update("name")}
            placeholder="e.g. Jordan Reyes"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          />
        </div>
        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Phone number
          </label>
          <input
            value={form.phone}
            onChange={update("phone")}
            placeholder="e.g. (555) 123-4567"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          />
        </div>
        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Email id
          </label>
          <input
            value={form.email}
            onChange={update("email")}
            placeholder="e.g. jordan.reyes@example.com"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          />
        </div>

        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Service address
          </label>
          <input
            value={form.address}
            onChange={update("address")}
            placeholder="e.g. 12 Maple St"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          />
        </div>

        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Service type
          </label>
          <select
            value={form.service}
            onChange={update("service")}
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          >
            <option>Pest</option>
            <option>Lawn</option>
            <option>HVAC</option>
          </select>
        </div>

        <div>
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Estimated price ($)
          </label>
          <input
            value={form.price}
            onChange={update("price")}
            placeholder="e.g. 240"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.paper,
              color: COLORS.ink,
            }}
          />
        </div>

        <button
          onClick={() => form.name && onSave(lead.id, form)}
          className="mt-2 flex items-center justify-center gap-2 py-3 font-bold text-sm uppercase tracking-wide"
          style={{
            backgroundColor: COLORS.gold,
            color: COLORS.forest,
            borderRadius: 8,
          }}
        >
          <CheckCircle2 size={17} /> Save Quote
        </button>
      </div>
    </div>
  );
}

export default function FieldQuoteDashboard() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [view, setView] = useState("dashboard");
  const [selectedLead, setSelectedLead] = useState(null);
  const stats = {
    appointments: leads.filter((l) => l.status === "Scheduled").length,
    quoted: leads.filter((l) => l.status === "Quoted").length,
    won: leads.filter((l) => l.status === "Won").length,
  };
  const handleSave = (form) => {
    const id = "WF-" + (2200 + leads.length + 1);
    setLeads([
      ...leads,
      {
        id,
        name: form.name,
        address: form.address || "—",
        time: "TBD",
        service: form.service,
        status: "Scheduled",
        price: form.price || 0,
        phone: form.phone || "—",
        email: form.email || "—",
      },
    ]);
    setView("dashboard");
  };
  const handleUpdateLead = (id, updatedFields) => {
    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, ...updatedFields } : lead,
      ),
    );
    setView("dashboard");
  };

  const handleDelete = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };
  const handleStatusChange = (id, newStatus) => {
    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead,
      ),
    );
  };
  let content;

  if (view === "dashboard") {
    content = (
      <>
        <h1
          className="text-2xl font-bold mb-1"
          style={{
            color: COLORS.ink,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Good morning, Alex.
        </h1>
        <p className="text-sm mb-5" style={{ color: COLORS.fade }}>
          Here's your route for today.
        </p>

        <div className="flex gap-3 mb-7">
          <StatCard label="Appointments" value={stats.appointments} />
          <StatCard label="Quotes Sent" value={stats.quoted} />
          <StatCard label="Won Today" value={stats.won} />
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-sm font-bold uppercase tracking-wide"
            style={{ color: COLORS.moss }}
          >
            Today's Route
          </h2>
          <button
            onClick={() => setView("new-quote")}
            className="flex items-center gap-1 px-4 py-2 text-xs font-bold uppercase tracking-wide"
            style={{
              backgroundColor: COLORS.gold,
              color: COLORS.forest,
              borderRadius: 6,
            }}
          >
            <Plus size={15} /> New Lead
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {leads.map((lead) => (
            <TicketCard
              key={lead.id}
              lead={lead}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onClick={() => {
                setSelectedLead(lead);
                setView("lead-details");
              }}
            />
          ))}
        </div>
      </>
    );
  } else if (view === "new-quote") {
    content = (
      <NewQuoteForm onBack={() => setView("dashboard")} onSave={handleSave} />
    );
  } else if (view === "lead-details") {
    content = (
      <LeadDetailForm
        lead={selectedLead}
        onBack={() => setView("dashboard")}
        onSave={handleUpdateLead}
      />
    );
  }

  return (
    <div
      style={{
        backgroundColor: COLORS.sand,
        minHeight: "100%",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
      `}</style>

      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: COLORS.forest }}
      >
        <span
          className="font-bold text-lg"
          style={{
            color: COLORS.sand,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          FieldQuote
        </span>
        <div className="text-right">
          <p className="text-sm font-semibold" style={{ color: COLORS.sand }}>
            Alex Rivera
          </p>
          <p className="text-xs" style={{ color: COLORS.moss }}>
            Tuesday, Aug 18
          </p>
        </div>
      </div>

      {content}
    </div>
  );
}

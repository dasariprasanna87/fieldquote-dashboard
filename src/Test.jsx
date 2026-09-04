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
  Search,
  ArrowUpDown,
  X,
  Calendar,
  CalendarClock,
  FileText,
  Receipt,
  Landmark,
  CreditCard,
  Banknote,
  PenLine,
  AlertCircle,
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

const STATUS_STYLE = {
  New: { bg: COLORS.paper, fg: COLORS.fade, border: COLORS.fade },
  Scheduled: { bg: COLORS.paper, fg: COLORS.moss, border: COLORS.moss },
  Proposal: { bg: COLORS.paper, fg: COLORS.gold, border: COLORS.gold },
  Sold: { bg: COLORS.forest, fg: COLORS.sand, border: COLORS.forest },
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
            {(lead.proposalTotal || lead.price) && (
              <p
                className="text-sm font-semibold mt-1"
                style={{ color: COLORS.forest }}
              >
                ${lead.proposalTotal || lead.price}
                {lead.proposalItems && lead.proposalItems.length > 1 && (
                  <span
                    className="font-normal ml-1"
                    style={{ color: COLORS.fade }}
                  >
                    ({lead.proposalItems.length} items)
                  </span>
                )}
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
          <option>New</option> <option>Scheduled</option>{" "}
          <option>Proposal</option> <option>Sold</option>{" "}
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

const STATUS_FILTERS = ["All", "New", "Scheduled", "Proposal", "Sold"];
const SERVICE_FILTERS = ["All", "Pest", "Lawn", "HVAC"];
const SORT_OPTIONS = [
  { value: "time", label: "Time" },
  { value: "name", label: "Name (A–Z)" },
  { value: "price-desc", label: "Price (high–low)" },
  { value: "price-asc", label: "Price (low–high)" },
];

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide whitespace-nowrap"
      style={{
        borderRadius: 999,
        border: `1px solid ${active ? COLORS.forest : COLORS.line}`,
        backgroundColor: active ? COLORS.forest : COLORS.paper,
        color: active ? COLORS.sand : COLORS.fade,
      }}
    >
      {children}
    </button>
  );
}

function RouteToolbar({
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
  serviceFilter,
  onServiceFilterChange,
  sortBy,
  onSortByChange,
  resultCount,
}) {
  const hasActiveFilters =
    query || statusFilter !== "All" || serviceFilter !== "All";

  return (
    <div
      className="flex flex-col gap-3 px-4 py-4 mb-4"
      style={{
        backgroundColor: COLORS.paper,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 10,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            color={COLORS.fade}
            className="absolute"
            style={{ left: 10, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name or address…"
            className="w-full text-sm outline-none"
            style={{
              padding: "8px 10px 8px 32px",
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.sand,
              color: COLORS.ink,
            }}
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              className="absolute"
              style={{ right: 8, top: "50%", transform: "translateY(-50%)" }}
            >
              <X size={14} color={COLORS.fade} />
            </button>
          )}
        </div>

        <div className="relative flex items-center gap-1">
          <ArrowUpDown size={14} color={COLORS.fade} />
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="text-xs font-semibold outline-none"
            style={{
              padding: "8px 8px",
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: COLORS.sand,
              color: COLORS.ink,
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className="text-[11px] font-bold uppercase tracking-wide mr-1"
          style={{ color: COLORS.fade }}
        >
          Status
        </span>
        {STATUS_FILTERS.map((s) => (
          <Pill
            key={s}
            active={statusFilter === s}
            onClick={() => onStatusFilterChange(s)}
          >
            {s}
          </Pill>
        ))}

        <span
          className="text-[11px] font-bold uppercase tracking-wide ml-3 mr-1"
          style={{ color: COLORS.fade }}
        >
          Service
        </span>
        {SERVICE_FILTERS.map((s) => (
          <Pill
            key={s}
            active={serviceFilter === s}
            onClick={() => onServiceFilterChange(s)}
          >
            {s}
          </Pill>
        ))}

        <span
          className="text-xs ml-auto"
          style={{
            color: COLORS.fade,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {resultCount} {resultCount === 1 ? "stop" : "stops"}
          {hasActiveFilters && (
            <button
              onClick={() => {
                onQueryChange("");
                onStatusFilterChange("All");
                onServiceFilterChange("All");
              }}
              className="ml-2 underline"
              style={{ color: COLORS.moss }}
            >
              clear
            </button>
          )}
        </span>
      </div>
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

  const isFormValid =
    form.name.trim() &&
    form.address.trim() &&
    form.phone.trim() &&
    form.email.trim() &&
    String(form.price).trim();

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
          onClick={() => isFormValid && onSave(form)}
          disabled={!isFormValid}
          className="mt-2 flex items-center justify-center gap-2 py-3 font-bold text-sm uppercase tracking-wide"
          style={{
            backgroundColor: isFormValid ? COLORS.gold : COLORS.line,
            color: isFormValid ? COLORS.forest : COLORS.fade,
            borderRadius: 8,
          }}
        >
          <CheckCircle2 size={17} /> Save Quote
        </button>
        {!isFormValid && (
          <p
            className="flex items-center gap-1.5 text-xs -mt-2"
            style={{ color: COLORS.fade }}
          >
            <AlertCircle size={13} /> Fill in all fields to save this lead.
          </p>
        )}
      </div>
    </div>
  );
}
function AppointmentSection({
  date,
  time,
  notes,
  onDateChange,
  onTimeChange,
  onNotesChange,
  onConfirm,
  onCancel,
}) {
  const inputStyle = {
    border: `1px solid ${COLORS.line}`,
    borderRadius: 6,
    backgroundColor: COLORS.paper,
    color: COLORS.ink,
  };

  return (
    <div
      className="flex flex-col gap-3 px-4 py-4"
      style={{
        backgroundColor: COLORS.sand,
        border: `1px solid ${COLORS.moss}`,
        borderRadius: 10,
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-wide"
        style={{ color: COLORS.moss }}
      >
        Schedule Appointment
      </p>

      <div className="flex gap-3">
        <div className="flex-1">
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={inputStyle}
          />
        </div>
        <div className="flex-1">
          <label
            className="text-xs uppercase font-semibold tracking-wide"
            style={{ color: COLORS.fade }}
          >
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label
          className="text-xs uppercase font-semibold tracking-wide"
          style={{ color: COLORS.fade }}
        >
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="e.g. Gate code is 4521, dog on premises"
          rows={2}
          className="w-full mt-1 px-3 py-2 text-sm outline-none resize-none"
          style={inputStyle}
        />
      </div>

      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={onConfirm}
          disabled={!date || !time}
          className="flex items-center justify-center gap-2 px-4 py-2 font-bold text-xs uppercase tracking-wide"
          style={{
            backgroundColor: date && time ? COLORS.moss : COLORS.line,
            color: COLORS.sand,
            borderRadius: 6,
          }}
        >
          <CheckCircle2 size={15} /> Confirm Appointment
        </button>
        <button
          onClick={onCancel}
          className="text-xs font-bold uppercase tracking-wide"
          style={{ color: COLORS.fade }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

let proposalIdSeed = 0;
function makeProposalItem() {
  proposalIdSeed += 1;
  return {
    id: `pi-${Date.now()}-${proposalIdSeed}`,
    description: "",
    price: "",
  };
}

function computeProposalTotal(items) {
  return items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
}

function ProposalSection({ items, onItemsChange, onConfirm, onCancel }) {
  const inputStyle = {
    border: `1px solid ${COLORS.line}`,
    borderRadius: 6,
    backgroundColor: COLORS.paper,
    color: COLORS.ink,
  };

  const updateItem = (id, field, value) =>
    onItemsChange(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  const removeItem = (id) => {
    if (items.length === 1) return;
    onItemsChange(items.filter((item) => item.id !== id));
  };

  const addItem = () => onItemsChange([...items, makeProposalItem()]);

  const total = computeProposalTotal(items);
  const canConfirm = items.every(
    (item) => item.description.trim() && Number(item.price) > 0,
  );

  return (
    <div
      className="flex flex-col gap-3 px-4 py-4"
      style={{
        backgroundColor: COLORS.sand,
        border: `1px solid ${COLORS.gold}`,
        borderRadius: 10,
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-wide"
        style={{ color: COLORS.gold }}
      >
        Add Proposal
      </p>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              value={item.description}
              onChange={(e) =>
                updateItem(item.id, "description", e.target.value)
              }
              placeholder="e.g. Perimeter pest treatment"
              className="flex-1 px-2 py-2 text-sm outline-none"
              style={inputStyle}
            />
            <input
              type="number"
              min="0"
              value={item.price}
              onChange={(e) => updateItem(item.id, "price", e.target.value)}
              placeholder="Price"
              className="px-2 py-2 text-sm outline-none"
              style={{ ...inputStyle, width: 92 }}
            />
            <button
              onClick={() => removeItem(item.id)}
              disabled={items.length === 1}
              style={{ color: items.length === 1 ? COLORS.line : COLORS.fade }}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}

        <button
          onClick={addItem}
          className="flex items-center gap-1 self-start text-xs font-bold uppercase tracking-wide"
          style={{ color: COLORS.moss }}
        >
          <Plus size={14} /> Add product
        </button>
      </div>

      <div
        className="flex items-center justify-between text-base font-bold px-1 pt-2"
        style={{ borderTop: `1px dashed ${COLORS.line}` }}
      >
        <span style={{ color: COLORS.forest }}>Total</span>
        <span
          style={{
            color: COLORS.forest,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          ${total.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={onConfirm}
          disabled={!canConfirm}
          className="flex items-center justify-center gap-2 px-4 py-2 font-bold text-xs uppercase tracking-wide"
          style={{
            backgroundColor: canConfirm ? COLORS.gold : COLORS.line,
            color: COLORS.forest,
            borderRadius: 6,
          }}
        >
          <CheckCircle2 size={15} /> Confirm Proposal
        </button>
        <button
          onClick={onCancel}
          className="text-xs font-bold uppercase tracking-wide"
          style={{ color: COLORS.fade }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

const PAYMENT_METHODS = [
  { value: "ACH", label: "ACH", icon: Landmark },
  { value: "Credit Card", label: "Credit Card", icon: CreditCard },
  { value: "Check", label: "Check", icon: Banknote },
];

function BillingScreen({ lead, onBack, onComplete }) {
  const [paymentMethod, setPaymentMethod] = useState(lead.paymentMethod || "");
  const [signatureName, setSignatureName] = useState(lead.signatureName || "");

  const items = lead.proposalItems || [];
  const total = lead.proposalTotal || 0;
  const isSold = lead.status === "Sold";
  const canComplete = paymentMethod && signatureName.trim().length > 1;

  const handleComplete = () => {
    if (!canComplete) return;
    onComplete(lead.id, {
      status: "Sold",
      paymentMethod,
      signatureName: signatureName.trim(),
      signedAt: new Date().toLocaleString(),
    });
  };

  const sectionStyle = {
    backgroundColor: COLORS.paper,
    border: `1px solid ${COLORS.line}`,
    borderRadius: 10,
  };

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm font-semibold mb-5"
        style={{ color: COLORS.moss }}
      >
        <ChevronLeft size={16} /> Back to lead
      </button>

      <h2
        className="flex items-center gap-2 text-2xl font-bold mb-5"
        style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <Receipt size={22} color={COLORS.forest} /> Billing
      </h2>

      <div className="flex flex-col gap-4">
        {/* Lead details */}
        <div className="px-4 py-4" style={sectionStyle}>
          <p
            className="text-xs font-bold uppercase tracking-wide mb-2"
            style={{ color: COLORS.fade }}
          >
            Customer
          </p>
          <p className="font-bold text-base" style={{ color: COLORS.ink }}>
            {lead.name}
          </p>
          <p className="text-sm mt-0.5" style={{ color: COLORS.fade }}>
            {lead.address}
          </p>
          <p className="text-sm" style={{ color: COLORS.fade }}>
            {lead.phone} {lead.email ? `· ${lead.email}` : ""}
          </p>
          <p className="text-sm mt-1" style={{ color: COLORS.moss }}>
            {lead.service} service
          </p>
        </div>

        {/* Proposal summary */}
        <div className="px-4 py-4" style={sectionStyle}>
          <p
            className="text-xs font-bold uppercase tracking-wide mb-2"
            style={{ color: COLORS.fade }}
          >
            Proposal
          </p>
          <div className="flex flex-col gap-1.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span style={{ color: COLORS.ink }}>{item.description}</span>
                <span
                  style={{
                    color: COLORS.ink,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  ${Number(item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div
            className="flex items-center justify-between text-base font-bold pt-2 mt-2"
            style={{ borderTop: `1px dashed ${COLORS.line}` }}
          >
            <span style={{ color: COLORS.forest }}>Total</span>
            <span
              style={{
                color: COLORS.forest,
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {isSold ? (
          <div
            className="flex flex-col gap-1 px-4 py-4"
            style={{
              backgroundColor: COLORS.forest,
              borderRadius: 10,
            }}
          >
            <p
              className="flex items-center gap-2 text-sm font-bold"
              style={{ color: COLORS.sand }}
            >
              <CheckCircle2 size={16} /> Sale complete
            </p>
            <p className="text-xs" style={{ color: COLORS.sand }}>
              Paid via {lead.paymentMethod} · Signed by {lead.signatureName}
              {lead.signedAt ? ` on ${lead.signedAt}` : ""}
            </p>
          </div>
        ) : (
          <>
            {/* Payment method */}
            <div className="px-4 py-4" style={sectionStyle}>
              <p
                className="text-xs font-bold uppercase tracking-wide mb-2"
                style={{ color: COLORS.fade }}
              >
                Payment method
              </p>
              <div className="flex flex-wrap gap-2">
                {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
                  <Pill
                    key={value}
                    active={paymentMethod === value}
                    onClick={() => setPaymentMethod(value)}
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon size={13} /> {label}
                    </span>
                  </Pill>
                ))}
              </div>
            </div>

            {/* Signature */}
            {paymentMethod && (
              <div className="px-4 py-4" style={sectionStyle}>
                <p
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide mb-2"
                  style={{ color: COLORS.fade }}
                >
                  <PenLine size={13} /> Customer signature
                </p>
                <input
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Type full name to sign"
                  className="w-full px-3 py-2 text-lg outline-none"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontStyle: "italic",
                    borderBottom: `2px solid ${COLORS.moss}`,
                    backgroundColor: "transparent",
                    color: COLORS.ink,
                  }}
                />
                <p className="text-[11px] mt-1" style={{ color: COLORS.fade }}>
                  By typing your name above you agree this represents your
                  signature.
                </p>
              </div>
            )}

            <button
              onClick={handleComplete}
              disabled={!canComplete}
              className="mt-1 flex items-center justify-center gap-2 py-3 font-bold text-sm uppercase tracking-wide"
              style={{
                backgroundColor: canComplete ? COLORS.gold : COLORS.line,
                color: COLORS.forest,
                borderRadius: 8,
              }}
            >
              <CheckCircle2 size={17} /> Complete Sale
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function LeadDetailForm({ lead, onBack, onSave, onViewBilling }) {
  const [form, setForm] = useState({
    name: lead.name || "",
    address: lead.address || "",
    service: lead.service || "Pest",
    price: lead.price || "",
    phone: lead.phone || "",
    email: lead.email || "",
    status: lead.status || "New",
  });

  const [showAppointment, setShowAppointment] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(
    lead.appointmentDate || "",
  );
  const [appointmentTime, setAppointmentTime] = useState(
    lead.appointmentTime || "",
  );
  const [appointmentNotes, setAppointmentNotes] = useState(
    lead.appointmentNotes || "",
  );

  const hasProposal = lead.proposalItems && lead.proposalItems.length > 0;
  const isSold = form.status === "Sold";
  const [showProposal, setShowProposal] = useState(false);
  const [proposalItems, setProposalItems] = useState(
    hasProposal ? lead.proposalItems : [makeProposalItem()],
  );

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const isFormValid =
    form.name.trim() &&
    form.address.trim() &&
    form.phone.trim() &&
    form.email.trim() &&
    String(form.price).trim();

  const confirmAppointment = () => {
    if (!appointmentDate || !appointmentTime) return;
    const updated = {
      ...form,
      status: "Scheduled",
      appointmentDate,
      appointmentTime,
      appointmentNotes,
    };
    setForm(updated);
    setShowAppointment(false);
    onSave(lead.id, updated);
  };

  const confirmProposal = () => {
    const valid = proposalItems.every(
      (item) => item.description.trim() && Number(item.price) > 0,
    );
    if (!valid) return;
    const total = computeProposalTotal(proposalItems);
    const updated = {
      ...form,
      status: "Proposal",
      proposalItems,
      proposalTotal: total,
    };
    setForm(updated);
    setShowProposal(false);
    onSave(lead.id, updated, "billing");
  };

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
        {form.status === "Sold" ? (
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              backgroundColor: COLORS.forest,
              borderRadius: 10,
            }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} color={COLORS.sand} />
              <p className="text-sm font-bold" style={{ color: COLORS.sand }}>
                Sold — appointment and proposal are locked
              </p>
            </div>
            <button
              onClick={() => onViewBilling(lead.id)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wide"
              style={{
                backgroundColor: COLORS.gold,
                color: COLORS.forest,
                borderRadius: 6,
              }}
            >
              <Receipt size={14} /> View Billing
            </button>
          </div>
        ) : (
          <>
            {form.status === "Scheduled" && !showAppointment ? (
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{
                  backgroundColor: COLORS.paper,
                  border: `1px solid ${COLORS.moss}`,
                  borderRadius: 10,
                }}
              >
                <div className="flex items-center gap-2">
                  <Calendar size={18} color={COLORS.moss} />
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: COLORS.ink }}
                    >
                      Appointment scheduled
                    </p>
                    <p className="text-xs" style={{ color: COLORS.fade }}>
                      {appointmentDate} at {appointmentTime}
                      {appointmentNotes ? ` — ${appointmentNotes}` : ""}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAppointment(true)}
                  className="text-xs font-bold uppercase tracking-wide underline"
                  style={{ color: COLORS.moss }}
                >
                  Reschedule
                </button>
              </div>
            ) : (
              !showAppointment && (
                <button
                  onClick={() => setShowAppointment(true)}
                  className="flex items-center gap-2 px-4 py-3"
                  style={{
                    border: `1px dashed ${COLORS.moss}`,
                    borderRadius: 10,
                    backgroundColor: COLORS.paper,
                  }}
                >
                  <CalendarClock size={18} color={COLORS.moss} />
                  <span
                    className="text-sm font-bold uppercase tracking-wide"
                    style={{ color: COLORS.moss }}
                  >
                    Schedule Appointment
                  </span>
                </button>
              )
            )}

            {showAppointment && (
              <AppointmentSection
                date={appointmentDate}
                time={appointmentTime}
                notes={appointmentNotes}
                onDateChange={setAppointmentDate}
                onTimeChange={setAppointmentTime}
                onNotesChange={setAppointmentNotes}
                onConfirm={confirmAppointment}
                onCancel={() => setShowAppointment(false)}
              />
            )}

            {hasProposal && !showProposal ? (
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{
                  backgroundColor: COLORS.paper,
                  border: `1px solid ${COLORS.gold}`,
                  borderRadius: 10,
                }}
              >
                <div className="flex items-center gap-2">
                  <FileText size={18} color={COLORS.gold} />
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: COLORS.ink }}
                    >
                      Proposal ready — ${lead.proposalTotal?.toFixed(2)}
                      {lead.proposalItems.length > 1 && (
                        <span
                          className="font-normal ml-1"
                          style={{ color: COLORS.fade }}
                        >
                          ({lead.proposalItems.length} items)
                        </span>
                      )}
                    </p>
                    <button
                      onClick={() => setShowProposal(true)}
                      className="text-xs font-bold uppercase tracking-wide underline"
                      style={{ color: COLORS.gold }}
                    >
                      Edit proposal
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onViewBilling(lead.id)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wide"
                  style={{
                    backgroundColor: COLORS.forest,
                    color: COLORS.sand,
                    borderRadius: 6,
                  }}
                >
                  <Receipt size={14} /> View Billing
                </button>
              </div>
            ) : (
              !showProposal && (
                <button
                  onClick={() => setShowProposal(true)}
                  className="flex items-center gap-2 px-4 py-3"
                  style={{
                    border: `1px dashed ${COLORS.gold}`,
                    borderRadius: 10,
                    backgroundColor: COLORS.paper,
                  }}
                >
                  <FileText size={18} color={COLORS.gold} />
                  <span
                    className="text-sm font-bold uppercase tracking-wide"
                    style={{ color: COLORS.gold }}
                  >
                    Add Proposal
                  </span>
                </button>
              )
            )}

            {showProposal && (
              <ProposalSection
                items={proposalItems}
                onItemsChange={setProposalItems}
                onConfirm={confirmProposal}
                onCancel={() => setShowProposal(false)}
              />
            )}
          </>
        )}

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
            disabled={isSold}
            placeholder="e.g. Jordan Reyes"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: isSold ? COLORS.sand : COLORS.paper,
              color: isSold ? COLORS.fade : COLORS.ink,
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
            disabled={isSold}
            placeholder="e.g. (555) 123-4567"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: isSold ? COLORS.sand : COLORS.paper,
              color: isSold ? COLORS.fade : COLORS.ink,
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
            disabled={isSold}
            placeholder="e.g. jordan.reyes@example.com"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: isSold ? COLORS.sand : COLORS.paper,
              color: isSold ? COLORS.fade : COLORS.ink,
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
            disabled={isSold}
            placeholder="e.g. 12 Maple St"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: isSold ? COLORS.sand : COLORS.paper,
              color: isSold ? COLORS.fade : COLORS.ink,
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
            disabled={isSold}
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: isSold ? COLORS.sand : COLORS.paper,
              color: isSold ? COLORS.fade : COLORS.ink,
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
            disabled={isSold}
            placeholder="e.g. 240"
            className="w-full mt-1 px-3 py-2 text-sm outline-none"
            style={{
              border: `1px solid ${COLORS.line}`,
              borderRadius: 6,
              backgroundColor: isSold ? COLORS.sand : COLORS.paper,
              color: isSold ? COLORS.fade : COLORS.ink,
            }}
          />
        </div>

        {!isSold && (
          <>
            <button
              onClick={() => isFormValid && onSave(lead.id, form)}
              disabled={!isFormValid}
              className="mt-2 flex items-center justify-center gap-2 py-3 font-bold text-sm uppercase tracking-wide"
              style={{
                backgroundColor: isFormValid ? COLORS.gold : COLORS.line,
                color: isFormValid ? COLORS.forest : COLORS.fade,
                borderRadius: 8,
              }}
            >
              <CheckCircle2 size={17} /> Save Quote
            </button>
            {!isFormValid && (
              <p
                className="flex items-center gap-1.5 text-xs -mt-2"
                style={{ color: COLORS.fade }}
              >
                <AlertCircle size={13} /> Fill in all fields to save this lead.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function FieldQuoteDashboard() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [view, setView] = useState("dashboard");
  const [selectedLead, setSelectedLead] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("time");

  const visibleLeads = leads
    .filter((lead) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.address.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;
      const matchesService =
        serviceFilter === "All" || lead.service === serviceFilter;
      return matchesQuery && matchesStatus && matchesService;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-desc")
        return (
          (Number(b.proposalTotal || b.price) || 0) -
          (Number(a.proposalTotal || a.price) || 0)
        );
      if (sortBy === "price-asc")
        return (
          (Number(a.proposalTotal || a.price) || 0) -
          (Number(b.proposalTotal || b.price) || 0)
        );
      return 0; // "time" keeps original route order
    });

  const stats = {
    appointments: leads.filter((l) => l.status === "Scheduled").length,
    proposals: leads.filter((l) => l.status === "Proposal").length,
    sold: leads.filter((l) => l.status === "Sold").length,
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
        status: "New",
        price: form.price || 0,
        phone: form.phone || "—",
        email: form.email || "—",
      },
    ]);
    setView("dashboard");
  };
  const handleUpdateLead = (id, updatedFields, navigateTo = "dashboard") => {
    let merged = null;
    setLeads(
      leads.map((lead) => {
        if (lead.id !== id) return lead;
        merged = { ...lead, ...updatedFields };
        return merged;
      }),
    );
    if (merged) setSelectedLead(merged);
    setView(navigateTo);
  };

  const handleViewBilling = (id) => {
    const lead = leads.find((l) => l.id === id);
    if (lead) setSelectedLead(lead);
    setView("billing");
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
          <StatCard label="Proposals Out" value={stats.proposals} />
          <StatCard label="Sold Today" value={stats.sold} />
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

        <RouteToolbar
          query={query}
          onQueryChange={setQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          serviceFilter={serviceFilter}
          onServiceFilterChange={setServiceFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          resultCount={visibleLeads.length}
        />

        <div className="flex flex-col gap-3">
          {visibleLeads.length === 0 ? (
            <div
              className="text-center py-10 text-sm"
              style={{ color: COLORS.fade }}
            >
              No stops match your filters.
            </div>
          ) : (
            visibleLeads.map((lead) => (
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
            ))
          )}
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
        onViewBilling={handleViewBilling}
      />
    );
  } else if (view === "billing") {
    content = (
      <BillingScreen
        lead={selectedLead}
        onBack={() => setView("lead-details")}
        onComplete={handleUpdateLead}
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

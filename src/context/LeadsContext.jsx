// LeadsContext.jsx
//
// Centralizes lead data + CRUD operations behind React's Context API, so any
// screen (dashboard, lead detail, billing, new-quote) can read/mutate leads
// without each one independently calling leadsService or receiving data via
// prop-drilling from a shared parent. Loading is done once, here, on mount.
//
// The custom hook `useLeads()` is the only way components are meant to touch
// this — it throws a clear error if used outside the provider, which catches
// a common setup mistake immediately instead of a silent `undefined` bug.

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as leadsService from "../services/leadsService";

const LeadsContext = createContext(null);

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    return leadsService
      .getLeads()
      .then((res) => setLeads(res.data))
      .catch((err) => setError(err.message || "Failed to load leads"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    leadsService
      .getLeads()
      .then((res) => {
        if (!cancelled) setLeads(res.data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load leads");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const getLeadById = useCallback(
    (id) => leads.find((lead) => lead.id === id) || null,
    [leads],
  );

  const addLead = useCallback(async (form) => {
    const res = await leadsService.createLead(form); // POST /leads
    setLeads((prev) => [...prev, res.data]);
    return res.data;
  }, []);

  const updateLead = useCallback(async (id, fields) => {
    const res = await leadsService.updateLead(id, fields); // PUT /leads/:id
    setLeads((prev) => prev.map((lead) => (lead.id === id ? res.data : lead)));
    return res.data;
  }, []);

  const deleteLead = useCallback(async (id) => {
    const previous = leads;
    setLeads((prev) => prev.filter((lead) => lead.id !== id)); // optimistic
    try {
      await leadsService.deleteLead(id); // DELETE /leads/:id
    } catch (err) {
      setLeads(previous); // roll back on failure
      throw err;
    }
  }, [leads]);

  const changeStatus = useCallback(async (id, status) => {
    const previous = leads;
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    ); // optimistic
    try {
      await leadsService.changeLeadStatus(id, status); // PATCH /leads/:id
    } catch (err) {
      setLeads(previous); // roll back on failure
      throw err;
    }
  }, [leads]);

  const value = {
    leads,
    loading,
    error,
    refresh,
    getLeadById,
    addLead,
    updateLead,
    deleteLead,
    changeStatus,
  };

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>;
}

export function useLeads() {
  const ctx = useContext(LeadsContext);
  if (!ctx) {
    throw new Error("useLeads() must be used inside a <LeadsProvider>");
  }
  return ctx;
}

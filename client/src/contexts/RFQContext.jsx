// contexts/RFQContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useAuth } from "./AuthContext";

const RFQContext = createContext();

export const RFQProvider = ({ children }) => {
  const RAW_API = (import.meta.env.VITE_API_URL || "").trim();
  const withoutTrailing = RAW_API.replace(/\/+$/, "");
  const API_BASE = withoutTrailing.toLowerCase().endsWith("/api")
    ? withoutTrailing
    : `${withoutTrailing}/api`;

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = API_BASE;

  const { user } = useAuth() || {};

  // states
  const [loading, setLoading] = useState(false); // used for list / fetch indicators
  const [actionLoading, setActionLoading] = useState(false); // used for create/update/delete
  const [rfqs, setRfqs] = useState([]);
  const [meta, setMeta] = useState({});
  const [myRfqs, setMyRfqs] = useState([]);
  const [bids, setBids] = useState([]);
  const [selectedRFQ, setSelectedRFQ] = useState(null);

  // helper auth header
  const getAuthHeader = () => {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ---------- API WRAPPERS ----------
  // NOTE: these set the loading/actionLoading flags.
  // They no longer cause provider to replace children.

  const createRFQ = async (payload) => {
    setActionLoading(true);
    try {
      const { data } = await axios.post("/rfq/create", payload, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      toast.success("RFQ posted successfully");
      await fetchMyRFQs();
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create RFQ");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const fetchMyRFQs = async (opts = { silent: false }) => {
    if (!opts.silent) setLoading(true);
    try {
      const { data } = await axios.get("/rfq/my-rfqs", {
        headers: getAuthHeader(),
      });
      setMyRfqs(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load your RFQs");
      return [];
    } finally {
      if (!opts.silent) setLoading(false);
    }
  };

  const fetchAllRFQs = async (opts = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(opts).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") params.append(k, v);
      });
      const { data } = await axios.get(`/rfq/all?${params.toString()}`, {
        headers: getAuthHeader(),
      });
      setMeta(data.meta || {});
      setRfqs(data.data || []);
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load RFQs");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchRFQById = async (rfqId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/rfq/${rfqId}`, {
        headers: getAuthHeader(),
      });
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load RFQ");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateRFQ = async (rfqId, payload) => {
    setActionLoading(true);
    try {
      const { data } = await axios.put(`/rfq/${rfqId}`, payload, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      toast.success("RFQ updated");
      await fetchMyRFQs();
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update RFQ");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteRFQ = async (rfqId) => {
    setActionLoading(true);
    try {
      await axios.delete(`/rfq/${rfqId}`, { headers: getAuthHeader() });
      toast.success("RFQ deleted");
      await fetchMyRFQs();
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete RFQ");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const fetchRFQBids = async (rfqId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/rfq/${rfqId}/bids`, {
        headers: getAuthHeader(),
      });
      // Handle new response format with bids and stats
      const bidsArray = data.bids || (Array.isArray(data) ? data : []);
      setBids(bidsArray);
      return data; // Returns { bids: [], stats: {} } or just []
    } catch (err) {
      // Silently handle error - no toast needed for viewing bids
      console.error("Failed to load bids:", err);
      return { bids: [], stats: {} };
    } finally {
      setLoading(false);
    }
  };

  // Bid APIs
  const createBid = async (payload) => {
    setActionLoading(true);
    try {
      const { data } = await axios.post("/bids", payload, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      toast.success("Bid submitted");
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit bid");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const fetchMyBids = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/bids/me", {
        headers: getAuthHeader(),
      });
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load bids");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateBid = async (bidId, payload) => {
    setActionLoading(true);
    try {
      const { data } = await axios.put(`/bids/${bidId}`, payload, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      toast.success("Bid updated");
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update bid");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteBid = async (bidId) => {
    setActionLoading(true);
    try {
      await axios.delete(`/bids/${bidId}`, { headers: getAuthHeader() });
      toast.success("Bid deleted");
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete bid");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const updateBidStatus = async (bidId, status, rejectionReason = "") => {
    setActionLoading(true);
    try {
      const { data } = await axios.put(
        `/bids/${bidId}/status`,
        { status, rejectionReason },
        {
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
        }
      );
      toast.success(
        status === "accepted" ? "Bid accepted!" : "Bid rejected"
      );
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update bid status");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // Cart
  const addToCart = async ({
    productId,
    supplierId,
    quantity = 1,
    isSample = false,
  }) => {
    setActionLoading(true);
    try {
      const payload = { productId, supplierId, quantity, isSample };
      const { data } = await axios.post("/cart/add", payload, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      toast.success("Added to cart");
      return data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add to cart");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // auto-fetch user's RFQs when user becomes available, but do it silently to avoid overlay remount
  useEffect(() => {
    if (user && user.role === "customer") {
      // fetch silently so provider children are not replaced
      fetchMyRFQs({ silent: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ALWAYS render children — don't replace with Loader (prevents remount loops)
  return (
    <RFQContext.Provider
      value={{
        rfqs,
        meta,
        myRfqs,
        bids,
        selectedRFQ,
        setSelectedRFQ,
        loading,
        actionLoading,
        createRFQ,
        fetchMyRFQs,
        fetchAllRFQs,
        fetchRFQById,
        updateRFQ,
        deleteRFQ,
        fetchRFQBids,
        createBid,
        fetchMyBids,
        updateBid,
        deleteBid,
        updateBidStatus,
        addToCart,
        API_BASE,
      }}
    >
      {children}

      {/* show a full-screen overlay loader when actionLoading or (explicit) loading is true */}
      {(actionLoading || loading) && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-[9999]">
          <Loader />
        </div>
      )}
    </RFQContext.Provider>
  );
};

export const useRFQ = () => useContext(RFQContext);

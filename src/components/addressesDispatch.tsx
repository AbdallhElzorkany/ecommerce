"use client";
import { retrieveAddresses } from "@/redux/slices/addressesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
export default function AddressesDispatch() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(retrieveAddresses());
  }, [dispatch]);
  return <></>;
}

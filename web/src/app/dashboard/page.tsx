"use client";
import DashboardHeader from "@/common/components/DashboardHeader";
import NoteModal from "@/common/components/modals/NoteModal";
import NoteCardsList from "@/common/components/NoteCardsList";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <DashboardHeader />
      <NoteModal />
      <NoteCardsList />
    </>
  );
}

"use client";
import DashboardHeader from "@/common/components/DashboardHeader";
import NoteModal from "@/common/components/modals/NoteModal";
import NoteCardsList from "@/common/components/NoteCardsList";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <NoteModal />
      <NoteCardsList />
    </>
  );
}

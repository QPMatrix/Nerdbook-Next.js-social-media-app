"use client";
import { Button } from "@/components/ui/button";
import KyInstance from "@/lib/ky";
import { NotificationsCountInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import Link from "next/link";
import React from "react";
interface NotificationsButtonProps {
  initialState: NotificationsCountInfo;
}
const NotificationsButton = ({ initialState }: NotificationsButtonProps) => {
  const { data } = useQuery({
    queryKey: ["unread-notifications-count"],
    queryFn: () =>
      KyInstance.get(
        "/api/notifications/unread-count",
      ).json<NotificationsCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });
  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Notifications"
      asChild
    >
      <Link href="/notifications">
        <div className="relative">
          <Bell />
          {!!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">Notifications</span>
      </Link>
    </Button>
  );
};

export default NotificationsButton;

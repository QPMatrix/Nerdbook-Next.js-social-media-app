"use client";

import { NotificationsPage } from "@/lib/types";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import KyInstance from "@/lib/ky";
import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import PostsSkeleton from "@/components/posts/posts-skeleton";
import Notification from "./notification";
const Notifications = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) =>
      KyInstance.get(
        "/api/notifications",
        pageParam ? { searchParams: { cursor: pageParam } } : {},
      ).json<NotificationsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => KyInstance.patch("/api/notifications/mark-as-read"),
    onSuccess: () => {
      queryClient.setQueryData(["unread-notifications-count"], {
        unreadCount: 0,
      });
    },
    onError(error) {
      console.error("Faild to mark notifications as read: ", error);
    },
  });
  useEffect(() => {
    mutate();
  }, [mutate]);
  const notifications = data?.pages.flatMap((page) => page.notifications) || [];
  if (status === "pending") {
    return <PostsSkeleton />;
  }
  if (status === "success" && !notifications.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        You don&apos;t have any notifications yet.
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occured while lodaing notifications.
      </p>
    );
  }
  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
};

export default Notifications;

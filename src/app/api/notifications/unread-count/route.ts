import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NotificationsCountInfo } from "@/lib/types";

export const GET = async () => {
  try {
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const unreadCount = await prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    });
    const data: NotificationsCountInfo = {
      unreadCount,
    };
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

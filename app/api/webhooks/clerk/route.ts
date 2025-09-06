// import { Webhook } from "svix"; // Clerk uses Svix under the hood
// import { headers } from "next/headers";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const payload = await req.json();
//     const heads = await headers();

//     // Verify webhook (optional but recommended)
//     const svix_id = heads.get("svix-id");
//     const svix_timestamp = heads.get("svix-timestamp");
//     const svix_signature = heads.get("svix-signature");

//     if (!svix_id || !svix_timestamp || !svix_signature) {
//       return new Response("Missing Svix headers", { status: 400 });
//     }

//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

//     let evt: any;
//     try {
//       evt = wh.verify(JSON.stringify(payload), {
//         "svix-id": svix_id,
//         "svix-timestamp": svix_timestamp,
//         "svix-signature": svix_signature,
//       });
//     } catch (err) {
//       console.error("Webhook verification failed:", err);
//       return new Response("Invalid signature", { status: 400 });
//     }

//     // Handle the event
//     const eventType = evt.type;
//     const data = evt.data;

//     if (eventType === "user.deleted") {
//       await prisma.user.delete({
//         where: { clerkId: data.id },
//       });
//       console.log("Deleted user from Neon:", data.id);
//     }

//     if (eventType === "user.created") {
//       await prisma.user.create({
//         data: {
//           clerkId: data.id,
//           email: data.email_addresses[0].email_address,
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           username:
//             data.username ?? data.email_addresses[0].email_address.split("@")[0],
//           image: data.image_url,
//         },
//       });
//       console.log("Created new user:", data.id);
//     }

//     return new Response("OK", { status: 200 });
//   } catch (err) {
//     console.error("Webhook handler error:", err);
//     return new Response("Server error", { status: 500 });
//   }
// }

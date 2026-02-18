"use server";

import { createClient } from "@/lib/supabase/server";
import { BookmarkFormValues } from "@/types/bookmark";
import { revalidatePath } from "next/cache";

export async function createBookmark(data: BookmarkFormValues) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const {data:insertedBookmark, error } = await supabase.from("bookmarks").insert([
    {
      title: data.title,
      url: data.url,
      user_id: user.id,
    },
  ]);

  if (error) throw error;

  // revalidatePath('/dashboard')

  return {success:true , message:"Bookmark created successfully"}
}

export async function updateBookmark(data: BookmarkFormValues) {
  if (!data.id) throw new Error("Bookmark ID required");

  const supabase = await createClient();

  const { error } = await supabase
    .from("bookmarks")
    .update({
      title: data.title,
      url: data.url,
    })
    .eq("id", data.id);

  if (error) throw error;
  // revalidatePath('/dashboard')
   return {success:true , message:"Bookmark updated successfully"}
}

export async function deleteBookmark(id: string) {
  if (!id) throw new Error("Bookmark ID required");

  const supabase = await createClient();

  const { error } = await supabase.from("bookmarks").delete().eq("id", id);

  if(error) throw error
//  revalidatePath('/dashboard')
  return {success:true , message:"Bookmark deleted successfully"}
}

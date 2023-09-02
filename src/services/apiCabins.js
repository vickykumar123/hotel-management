import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins data cant be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(
    "https://owlxfrhroeakofwcduvz.supabase.co/storage/v1/object/public/cabins"
  );

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  //https://owlxfrhroeakofwcduvz.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg
  const imagePath = hasImagePath
    ? newCabin.image
    : `https://owlxfrhroeakofwcduvz.supabase.co/storage/v1/object/public/cabins/${imageName}`;

  let query = supabase.from("cabins");
  //1. create cabin
  //A. Create a new Cabin
  if (!id) {
    //if there is not id then create
    query = query.insert([{ ...newCabin, image: imagePath }]); //inserting into the table]
  }

  //B. Edit the cabin
  if (id) {
    //if id exists
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins data cant be created");
  }

  //2. Upload Image

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  //3. Delete the cabin if image can't be uploaded.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabins image cannot be uploaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins can't be deleted");
  }
}

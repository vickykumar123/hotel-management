import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  // console.log("session => ", session);
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  // console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. Update fullName or password
  let updateUser;
  if (password) updateUser = { password };
  if (fullName) updateUser = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateUser);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. Upload the avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // https://owlxfrhroeakofwcduvz.supabase.co/storage/v1/object/public/avatars/HackerPic.jpg

  //3. Update avatar of the User

  const { data: updatedData, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `https://owlxfrhroeakofwcduvz.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedData;
}

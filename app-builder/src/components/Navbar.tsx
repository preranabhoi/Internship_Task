"use client";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function Navbar() {
  const { data: session } =
    useSession();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">
        App Builder
      </h1>

      {session ? (
        <div className="flex gap-4 items-center">
          <span>
            {session.user?.name}
          </span>

          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            signIn("google")
          }
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login with Google
        </button>
      )}
    </div>
  );
}

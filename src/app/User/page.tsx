"use client";

import { Suspense } from "react";
import UserPage from "./UserPage";

export default function UserPageWrapper() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <UserPage />
        </Suspense>
    );
}

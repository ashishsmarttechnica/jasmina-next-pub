import { checkDndMode } from "@/api/chat.api";
import { updateCompanyDndMode } from "@/api/company.api";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useChatDndStore = create(
    devtools(
        (set, get) => ({
            switchOn: null,
            loading: false,
            error: null,
            setSwitchOn: (value) => set({ switchOn: value }),
            async checkDnd(senderId, receiverId) {
                if (!senderId || !receiverId) return;
                set({ loading: true, error: null });
                try {
                    const response = await checkDndMode({ senderId, receiverId });
                    // Normalize API response → derive dndEnabled (true means DND ON)
                    // Common possibilities: { dndEnabled }, { dnd }, { data: { dndEnabled } }, success meaning allowed
                    const coerceBool = (v) => {
                        if (typeof v === "boolean") return v;
                        if (typeof v === "string") {
                            const lc = v.toLowerCase();
                            if (lc === "true") return true;
                            if (lc === "false") return false;
                        }
                        return undefined;
                    };

                    let dndEnabled = undefined;
                    if (typeof response?.data?.dndEnabled === "boolean") {
                        dndEnabled = response.data.dndEnabled;
                    } else if (typeof response?.data?.dndEnabled === "string") {
                        dndEnabled = coerceBool(response.data.dndEnabled);
                    } else if (typeof response?.dndEnabled === "boolean") {
                        dndEnabled = response.dndEnabled;
                    } else if (typeof response?.dndEnabled === "string") {
                        dndEnabled = coerceBool(response.dndEnabled);
                    } else if (typeof response?.data?.dnd === "boolean") {
                        dndEnabled = response.data.dnd;
                    } else if (typeof response?.data?.dnd === "string") {
                        dndEnabled = coerceBool(response.data.dnd);
                    } else if (typeof response?.dnd === "boolean") {
                        dndEnabled = response.dnd;
                    } else if (typeof response?.dnd === "string") {
                        dndEnabled = coerceBool(response.dnd);
                    } else if (typeof response?.success === "boolean") {
                        // If success=true means chat allowed, then DND is OFF
                        dndEnabled = !response.success;
                    } else if (typeof response === "boolean" || typeof response === "string") {
                        dndEnabled = coerceBool(response);
                    }

                    // Default safely if backend didn't return a boolean
                    if (typeof dndEnabled !== "boolean") dndEnabled = false;

                    set({ switchOn: dndEnabled, loading: false });
                    return dndEnabled;
                } catch (err) {
                    set({ error: err?.message || "Failed to check DND", loading: false });
                    return null;
                }
            },
            async updateDndMode(companyId, dndEnabled) {
                console.log("ChatDndStore - updateDndMode called with:", { companyId, dndEnabled });
                if (!companyId) return;
                set({ loading: true, error: null });
                try {
                    const response = await updateCompanyDndMode({ companyId, dndEnabled });
                    console.log("ChatDndStore - updateCompanyDndMode response:", response);
                    if (response.success) {
                        // Update the local state to match the API response
                        // If API returns success, the dndEnabled value was accepted
                        // So we should set switchOn to match what was sent (dndEnabled)
                        console.log("ChatDndStore - Setting switchOn to:", dndEnabled);
                        set({ switchOn: dndEnabled, loading: false });
                        return true;
                    } else {
                        set({ error: "Failed to update DND mode", loading: false });
                        return false;
                    }
                } catch (err) {
                    console.error("ChatDndStore - Error in updateDndMode:", err);
                    set({ error: err?.message || "Failed to update DND mode", loading: false });
                    return false;
                }
            },
        }),
        { name: "ChatDndStore" }
    )
);

export default useChatDndStore;



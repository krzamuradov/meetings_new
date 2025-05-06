export const permissions = {
    1: ["list-meetings", "show-meeting", "create-meeting", "edit-meeting", "delete-meeting", "users-list", "users-create"],
    2: ["list-meetings", "show-meeting", "create-meeting", "edit-meeting", "delete-meeting", "users-list", "users-create"],
    3: ["list-meetings", "show-meeting", "list-documents", "show-document"],
};

export function can(ability) {
    try {
        const userRaw = localStorage.getItem("user");
        if (!userRaw) return false;

        const user = JSON.parse(userRaw);
        const userAbilities = permissions[user.role_id] || [];

        return userAbilities.includes(ability);
    } catch (e) {
        console.error("Ошибка в can():", e);
        return false;
    }
}

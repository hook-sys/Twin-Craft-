"use client";

import { useActionState } from "react";
import { changeRoleAction, removeMemberAction } from "./actions";
import { Select } from "@/components/ui/field";
import type { CompanyRole } from "@/types";

export default function MemberRow({
  memberId,
  role,
  canChangeRole,
  canRemove,
}: {
  memberId: string;
  role: CompanyRole;
  canChangeRole: boolean;
  canRemove: boolean;
}) {
  const [roleState, roleFormAction, rolePending] = useActionState(
    changeRoleAction,
    null,
  );
  const [removeState, removeFormAction, removePending] = useActionState(
    removeMemberAction,
    null,
  );

  const error =
    (roleState && !roleState.ok && roleState.error) ||
    (removeState && !removeState.ok && removeState.error) ||
    null;

  return (
    <div className="flex items-center justify-end gap-2">
      {error && <span className="text-xs text-danger">{error}</span>}

      {canChangeRole && (
        <form action={roleFormAction} className="flex items-center gap-2">
          <input type="hidden" name="memberId" value={memberId} />
          <Select
            name="role"
            defaultValue={role}
            disabled={rolePending}
            className="w-32 py-1.5 text-sm"
            onChange={(event) => event.currentTarget.form?.requestSubmit()}
          >
            <option value="OWNER">Owner</option>
            <option value="ADMIN">Admin</option>
            <option value="STAFF">Staff</option>
          </Select>
        </form>
      )}

      {canRemove && (
        <form action={removeFormAction}>
          <input type="hidden" name="memberId" value={memberId} />
          <button
            type="submit"
            disabled={removePending}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-danger transition hover:bg-danger-soft disabled:opacity-50"
          >
            সরান
          </button>
        </form>
      )}
    </div>
  );
}

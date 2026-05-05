import { ref } from 'vue'
import {
  activateMember,
  blockMember,
  getMemberByID,
  unblockMember,
  grandAdminPrivileges,
  ungrandAdminPrivileges,
  grandSuperAdminPrivileges,
} from '@/services/perchAI/members'
import type { Member } from '@/types/member'

export function useMember() {
  const member = ref<Member | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async (id: string) => {
    isLoading.value = true
    error.value = null
    try {
      member.value = await getMemberByID(id)
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: member,
    isLoading,
    error,
    fetch,
  }
}

export function useManageMember(toast: any = null) {
  const isUpdating = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const fetchActivate = async (id: string) => {
    isUpdating.value = true
    error.value = null
    try {
      await activateMember(id)
      if (toast) {
        toast.add(localSuccessToast('Activate'))
      }
    } catch (err) {
      error.value = err as Error
      if (toast) {
        toast.add(localErrorToast('Activate'))
      }
    } finally {
      isUpdating.value = false
    }
  }
  const fetchBlock = async (id: string) => {
    isUpdating.value = true
    error.value = null
    try {
      await blockMember(id)
      if (toast) {
        toast.add(localSuccessToast('Block'))
      }
    } catch (err) {
      error.value = err as Error
      if (toast) {
        toast.add(localErrorToast('Block'))
      }
    } finally {
      isUpdating.value = false
    }
  }
  const fetchUnblock = async (id: string) => {
    isUpdating.value = true
    error.value = null
    try {
      await unblockMember(id)
      if (toast) {
        toast.add(localSuccessToast('Unblock'))
      }
    } catch (err) {
      error.value = err as Error
      if (toast) {
        toast.add(localErrorToast('Unblock'))
      }
    } finally {
      isUpdating.value = false
    }
  }
  const fetchGrantAdminPrivileges = async (id: string) => {
    isUpdating.value = true
    error.value = null
    try {
      await grandAdminPrivileges(id)
      if (toast) {
        toast.add(localSuccessToast('Admin Privileges Granded'))
      }
    } catch (err) {
      error.value = err as Error
      if (toast) {
        toast.add(localErrorToast('Admin Privileges Grand failed'))
      }
    } finally {
      isUpdating.value = false
    }
  }
  const fetchUngrantAdminPrivileges = async (id: string) => {
    isUpdating.value = true
    error.value = null
    try {
      await ungrandAdminPrivileges(id)
      if (toast) {
        toast.add(localSuccessToast('Admin Privileges Ungranded'))
      }
    } catch (err) {
      error.value = err as Error
      if (toast) {
        toast.add(localErrorToast('Admin Privileges Ungrand failed'))
      }
    } finally {
      isUpdating.value = false
    }
  }
  const fetchGrantSuperAdminPrivileges = async (id: string) => {
    isUpdating.value = true
    error.value = null
    try {
      await grandSuperAdminPrivileges(id)
      if (toast) {
        toast.add(localSuccessToast('Super Admin Privileges Granded'))
      }
    } catch (err) {
      error.value = err as Error
      if (toast) {
        toast.add(localErrorToast('Super Admin Privileges Grand failed'))
      }
    } finally {
      isUpdating.value = false
    }
  }
  return {
    isUpdating,
    error,
    fetchActivate,
    fetchBlock,
    fetchUnblock,
    fetchGrantAdminPrivileges,
    fetchUngrantAdminPrivileges,
    fetchGrantSuperAdminPrivileges,
  }
}

function localErrorToast(oper: string) {
  return { severity: 'error', summary: `${oper} Failed`, life: 10000 }
}
function localSuccessToast(oper: string) {
  return { severity: 'success', summary: `${oper} Success`, life: 10000 }
}

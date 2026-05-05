<template>
  <DataTable :value="members">
    <Column field="activated" style="width: 5%" sortable>
      <template #body="slotProps">
        <Tag
          v-if="!slotProps.data.activated"
          icon="pi pi-lock"
          severity="secondary"
          value="尚未啟用"
        ></Tag>
      </template>
    </Column>
    <Column field="blocked" style="width: 5%" sortable>
      <template #body="slotProps">
        <Tag v-if="slotProps.data.blocked" icon="pi pi-ban" severity="danger" value="Blocked">
        </Tag>
      </template>
    </Column>
    <Column field="id" header="ID"></Column>
    <Column field="display_name" header="顯示名稱" sortable>
      <template #body="slotProps">
        <MemberNameWithPhoto :member="slotProps.data"></MemberNameWithPhoto>
      </template>
    </Column>
    <Column field="position" header="職稱" sortable></Column>
    <Column field="is_admin" header="Admin" sortable>
      <template #body="slotProps">
        <i v-if="slotProps.data.is_admin" class="pi pi-check-circle" style="color: green"></i>
        <i v-else class="pi pi-times-circle" style="color: red"></i>
      </template>
    </Column>
    <Column field="is_super_admin" header="Super Admin" sortable>
      <template #body="slotProps">
        <i v-if="slotProps.data.is_super_admin" class="pi pi-check-circle" style="color: green"></i>
        <i v-else class="pi pi-times-circle" style="color: red"></i>
      </template>
    </Column>

    <Column>
      <template #body="slotProps">
        <Button
          v-if="!slotProps.data.activated && !slotProps.data.blocked"
          icon="pi pi-lock-open"
          severity="help"
          label="啟用"
          variant="outlined"
          @click="handleActicateClick(slotProps.data.id)"
        ></Button>
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <Button
          v-if="!slotProps.data.blocked && !slotProps.data.is_super_admin"
          icon="pi pi-ban"
          severity="danger"
          label="Block"
          variant="outlined"
          @click="handleBlockClick(slotProps.data.id)"
        ></Button>
        <Button
          v-if="slotProps.data.blocked && !slotProps.data.is_super_admin"
          icon="pi pi-refresh"
          severity="warn"
          label="Recover"
          variant="outlined"
          @click="handleUnblockClick(slotProps.data.id)"
        ></Button>
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <Button
          v-if="
            !slotProps.data.is_admin && auth.currentUser?.is_admin && !slotProps.data.is_super_admin
          "
          severity="success"
          label="授權 Admin"
          variant="outlined"
          @click="handleGrandAdminClick(slotProps.data.id)"
        ></Button>
        <Button
          v-if="
            slotProps.data.is_admin &&
            auth.currentUser?.is_super_admin &&
            !slotProps.data.is_super_admin
          "
          severity="warn"
          label="撤銷 Admin"
          variant="outlined"
          @click="handleUngrandAdminClick(slotProps.data.id)"
        ></Button>
      </template>
    </Column>
    <Column v-if="auth.currentUser?.is_super_admin">
      <template #body="slotProps">
        <Button
          v-if="!slotProps.data.is_super_admin"
          severity="success"
          label="授權 Super Admin"
          variant="outlined"
          @click="handleGrandSuperAdminClick(slotProps.data.id)"
        ></Button>
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { useMembers } from '@/composables/members/useMembers'
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useToast } from 'primevue'

import MemberNameWithPhoto from '../MemberNameWithPhoto.vue'
import { useManageMember } from '@/composables/members/useMemberByID'

const toast = useToast()
const auth = useAuth()

const {
  data: members,
  isLoading: isMembersLoading,
  error: membersError,
  fetch: fetchMembers,
} = useMembers()

const {
  isUpdating,
  error: fetchError,
  fetchActivate,
  fetchBlock,
  fetchUnblock,
  fetchGrantAdminPrivileges,
  fetchUngrantAdminPrivileges,
  fetchGrantSuperAdminPrivileges,
} = useManageMember(toast)

onMounted(() => {
  fetchMembers()
})

const handleActicateClick = async (id: string) => {
  await fetchActivate(id)
  await fetchMembers()
}
const handleBlockClick = async (id: string) => {
  await fetchBlock(id)
  await fetchMembers()
}
const handleUnblockClick = async (id: string) => {
  await fetchUnblock(id)
  await fetchMembers()
}

const handleGrandAdminClick = async (id: string) => {
  await fetchGrantAdminPrivileges(id)
  await fetchMembers()
}
const handleUngrandAdminClick = async (id: string) => {
  await fetchUngrantAdminPrivileges(id)
  await fetchMembers()
}

const handleGrandSuperAdminClick = async (id: string) => {
  await fetchGrantSuperAdminPrivileges(id)
  await fetchMembers()
}
</script>

const KEY = 'hta_admin_mode'

export const getAdminMode = () => {
  try { return localStorage.getItem(KEY) === '1' } catch { return false }
}

export const saveAdminMode = val => {
  try { val ? localStorage.setItem(KEY, '1') : localStorage.removeItem(KEY) } catch {}
}

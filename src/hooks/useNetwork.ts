import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface NetworkInfo {
  online: boolean
  effectiveType: string
  downlink: number | null
  rtt: number | null
  saveData: boolean
  type: string
}

export interface UseNetworkOptions {
  onOnline?: () => void
  onOffline?: () => void
}

export function useNetwork(options: UseNetworkOptions = {}) {
  const isOnline = ref(navigator.onLine)
  const connectionInfo = ref<NetworkInfo>({
    online: navigator.onLine,
    effectiveType: 'unknown',
    downlink: null,
    rtt: null,
    saveData: false,
    type: 'unknown',
  })

  const uptime = ref(0)
  let startTime = Date.now()
  let timer: number | null = null
  let listenersAttached = false

  const online = computed(() => isOnline.value)
  const effectiveType = computed(() => connectionInfo.value.effectiveType)
  const downlink = computed(() => connectionInfo.value.downlink)
  const rtt = computed(() => connectionInfo.value.rtt)
  const saveData = computed(() => connectionInfo.value.saveData)
  const type = computed(() => connectionInfo.value.type)

  function updateConnectionInfo() {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
      connectionInfo.value = {
        online: navigator.onLine,
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || null,
        rtt: connection.rtt || null,
        saveData: connection.saveData || false,
        type: connection.type || 'unknown',
      }
    }
  }

  function handleOnline() {
    isOnline.value = true
    startTime = Date.now()
    startTimer()
    updateConnectionInfo()
    options.onOnline?.()
  }

  function handleOffline() {
    isOnline.value = false
    stopTimer()
    updateConnectionInfo()
    options.onOffline?.()
  }

  function handleConnectionChange() {
    updateConnectionInfo()
  }

  function startTimer() {
    stopTimer()
    startTime = Date.now()
    timer = window.setInterval(() => {
      uptime.value = Math.floor((Date.now() - startTime) / 1000)
    }, 1000)
  }

  function stopTimer() {
    if (timer !== null) {
      window.clearInterval(timer)
      timer = null
    }
  }

  function init() {
    if (listenersAttached) return
    listenersAttached = true

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
      connection.addEventListener('change', handleConnectionChange)
      updateConnectionInfo()
    }

    if (isOnline.value) {
      startTimer()
    }
  }

  function destroy() {
    if (!listenersAttached) return
    listenersAttached = false

    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
      connection.removeEventListener('change', handleConnectionChange)
    }

    stopTimer()
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    destroy()
  })

  return {
    online,
    isOnline,
    effectiveType,
    downlink,
    rtt,
    saveData,
    type,
    uptime,
    connectionInfo,
    init,
    destroy,
    refresh: updateConnectionInfo,
  }
}

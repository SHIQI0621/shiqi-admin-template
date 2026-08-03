import { ref, onBeforeUnmount, type Ref } from 'vue'
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

/** 播放器配置项 */
export interface VideoOptions {
  /** 视频地址 */
  url: string
  /** 封面图 */
  poster?: string
  /** 自动播放 */
  autoplay?: boolean
  /** 循环播放 */
  loop?: boolean
  /** 静音 */
  muted?: boolean
  /** 初始音量 (0~1) */
  volume?: number
  /** 播放速率 */
  playbackRate?: number
  /** 流式播放（直播） */
  isLive?: boolean
  /** 是否启用画中画 */
  pip?: boolean
  /** 是否启用截图 */
  screenShot?: boolean
  /** 是否启用键盘快捷键 */
  keyboard?: boolean
  /** 是否启用下载 */
  download?: boolean
  /** 画布语言 */
  lang?: string
  /** 额外配置（透传给 xgplayer） */
  extra?: Record<string, any>
}

/** 播放器实例类型 */
export type VideoPlayerInstance = Player

/**
 * 视频播放 Hook（基于西瓜播放器 xgplayer）
 *
 * @example
 * ```ts
 * const { player, init, play, pause, destroy, isPlaying, currentTime, duration } = useVideo()
 *
 * onMounted(() => {
 *   init('video-container', { url: 'https://example.com/video.mp4' })
 * })
 * ```
 */
export function useVideo() {
  const player = ref<VideoPlayerInstance | null>(null)
  const isReady = ref(false)
  const isPlaying = ref(false)
  const isMuted = ref(false)
  const isFullscreen = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const buffered = ref(0)
  const volume = ref(1)
  const playbackRate = ref(1)

  /** 初始化播放器 */
  function init(containerId: string, options: VideoOptions) {
    // 先销毁旧实例
    destroy()

    const config: Record<string, any> = {
      id: containerId,
      url: options.url,
      autoplay: options.autoplay ?? false,
      loop: options.loop ?? false,
      muted: options.muted ?? false,
      volume: options.volume ?? 0.6,
      playbackRate: options.playbackRate ?? 1,
      isLive: options.isLive ?? false,
      pip: options.pip ?? false,
      screenShot: options.screenShot ?? false,
      keyboard: options.keyboard ?? false,
      download: options.download ?? false,
      lang: options.lang ?? 'zh-cn',
      ...options.extra,
    }
    // 可选参数：仅在传值时才设置，避免 undefined 覆盖默认值
    if (options.poster) {
      config.poster = options.poster
    }

    player.value = new Player(config)

    // 绑定事件
    player.value.on('ready', () => {
      isReady.value = true
      duration.value = player.value?.duration || 0
      volume.value = player.value?.volume || 1
    })

    player.value.on('play', () => {
      isPlaying.value = true
    })

    player.value.on('pause', () => {
      isPlaying.value = false
    })

    player.value.on('timeupdate', () => {
      currentTime.value = player.value?.currentTime || 0
    })

    player.value.on('durationchange', () => {
      duration.value = player.value?.duration || 0
    })

    player.value.on('volumechange', () => {
      volume.value = player.value?.volume || 0
      isMuted.value = player.value?.muted || false
    })

    player.value.on('progress', () => {
      buffered.value = player.value?.buffered?.end(0) || 0
    })

    player.value.on('fullscreenchange', () => {
      isFullscreen.value = !isFullscreen.value
    })

    player.value.on('ended', () => {
      isPlaying.value = false
    })

    player.value.on('error', (err: any) => {
      console.error('[useVideo] Player error:', err)
    })
  }

  /** 播放 */
  function play() {
    player.value?.play()
  }

  /** 暂停 */
  function pause() {
    player.value?.pause()
  }

  /** 切换播放/暂停 */
  function togglePlay() {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  /** 跳转到指定时间（秒） */
  function seek(time: number) {
    if (player.value) {
      player.value.currentTime = time
      currentTime.value = time
    }
  }

  /** 设置音量 (0~1) */
  function setVolume(vol: number) {
    if (player.value) {
      player.value.volume = vol
      volume.value = vol
    }
  }

  /** 静音/取消静音 */
  function toggleMute() {
    if (player.value) {
      player.value.muted = !player.value.muted
      isMuted.value = player.value.muted
    }
  }

  /** 设置播放速率 */
  function setPlaybackRate(rate: number) {
    if (player.value) {
      player.value.playbackRate = rate
      playbackRate.value = rate
    }
  }

  /** 进入/退出全屏 */
  function toggleFullscreen() {
    player.value?.getFullscreen?.()
  }

  /** 截图 */
  function screenshot(filename?: string) {
    player.value?.getPlugin('screenShot')?.screenshot(filename)
  }

  /** 画中画 */
  function togglePip() {
    player.value?.getPlugin('pip')?.switchPip()
  }

  /** 切换视频源 */
  function switchUrl(url: string, poster?: string) {
    if (player.value) {
      player.value.src = url
      if (poster) {
        player.value.poster = poster
      }
      currentTime.value = 0
    }
  }

  /** 销毁播放器 */
  function destroy() {
    if (player.value) {
      player.value.destroy()
      player.value = null
      isReady.value = false
      isPlaying.value = false
      currentTime.value = 0
      duration.value = 0
      buffered.value = 0
    }
  }

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    player: player as Ref<VideoPlayerInstance | null>,
    isReady,
    isPlaying,
    isMuted,
    isFullscreen,
    currentTime,
    duration,
    buffered,
    volume,
    playbackRate,
    init,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    setPlaybackRate,
    toggleFullscreen,
    screenshot,
    togglePip,
    switchUrl,
    destroy,
  }
}

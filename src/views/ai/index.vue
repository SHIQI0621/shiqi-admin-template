<template>
  <div class="ai-chat-container">
    <Card :border-radius="16" class="chat-card">
      <template #header>
        <div class="card-header">
          <span>AI 智能对话</span>
          <el-button type="primary" size="small" @click="clearChat">清空对话</el-button>
        </div>
      </template>
      
      <!-- 对话消息区域 -->
      <div class="chat-messages" ref="messagesContainer">
        <div 
          v-for="(msg, index) in messages" 
          :key="index" 
          :class="['message-item', msg.role]"
        >
          <div class="avatar">
            <el-icon v-if="msg.role === 'user'" :size="24"><User /></el-icon>
            <el-icon v-else :size="24"><Cpu /></el-icon>
          </div>
          <div class="message-content" v-html="msg.content"></div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="isLoading" class="message-item assistant">
          <div class="avatar"><el-icon :size="24"><Cpu /></el-icon></div>
          <div class="message-content loading">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="chat-input">
        <el-button 
          type="primary" 
          :loading="isLoading"
          @click="sendMessage"
          style="margin: 0 0 10px 0; width: 80px;float: right;"
        >
          发送
        </el-button>
        <el-input
          v-model="inputMessage"
          type="textarea"
          :rows="3"
          placeholder="请输入您的问题..."
          @keydown.enter.exact="sendMessage"
        />
        
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AIChat' })
import { ref, nextTick } from 'vue'
import { User, Cpu } from '@element-plus/icons-vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: '你好！我是AI助手，有什么可以帮助您的吗？'
  }
])
const inputMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement>()

const mockResponses = [
  '这是一个很好的问题！根据我的理解，您可以尝试以下方法来解决...',
  '我明白您的需求了。让我为您详细解释一下...',
  '根据最新的技术趋势，我建议您关注以下几个方面...',
  '这个问题涉及多个层面，我来为您逐一分析...',
  '好的，我已经处理了您的请求。以下是详细结果...'
]

async function sendMessage() {
  if (!inputMessage.value.trim() || isLoading.value) return
  
  messages.value.push({
    role: 'user',
    content: inputMessage.value
  })
  
  inputMessage.value = ''
  isLoading.value = true
  
  await nextTick()
  scrollToBottom()
  
  setTimeout(() => {
    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)]
    messages.value.push({
      role: 'assistant',
      content: response
    })
    isLoading.value = false
    scrollToBottom()
  }, 1000 + Math.random() * 1000)
}

function clearChat() {
  messages.value = [{
    role: 'assistant',
    content: '对话已清空，有什么可以帮您的吗？'
  }]
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped lang="scss">
.ai-chat-container {
  height: 100%;
  
  .chat-card {
    height: 100%;
    
    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
      height: calc(100% - 60px);
      padding: 0;
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #f5f7fa;
    
    .message-item {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
      
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        
        .user & {
          background: #409eff;
          color: #fff;
        }
        
        .assistant & {
          background: #67c23a;
          color: #fff;
        }
      }
      
      .message-content {
        max-width: 70%;
        padding: 12px 16px;
        border-radius: 8px;
        line-height: 1.6;
        
        .user & {
          background: #409eff;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        
        .assistant & {
          background: #fff;
          color: #333;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        &.loading {
          display: flex;
          gap: 6px;
          padding: 16px 20px;
          
          .dot {
            width: 8px;
            height: 8px;
            background: #409eff;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
            
            &:nth-child(1) { animation-delay: -0.32s; }
            &:nth-child(2) { animation-delay: -0.16s; }
          }
        }
      }
    }
  }
  
  .chat-input {
    padding: 16px 20px;
    border-top: 1px solid #e4e7ed;
    background: #fff;
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>

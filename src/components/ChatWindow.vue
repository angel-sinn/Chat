<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="document in formattedDocuments" :key="document.id" class="chat">
        <span class="bubble">
          <span class="name">{{ document.name }}:</span>
          <span class="message">{{ document.message }}</span>
        </span>
        <span class="created">{{ document.createdAt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onUpdated, ref } from '@vue/runtime-core';

import getCollection from '../composables/getCollection';
import { formatDistanceToNow } from 'date-fns';

export default {
  setup() {
    const { error, documents } = getCollection('messages');

    // update date format for all documents
    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((document) => {
          let time = formatDistanceToNow(document.createdAt.toDate());
          return { ...document, createdAt: time }
        })
      }
    })

    // auto-scroll to bottom of messages
    const messages = ref(null);

    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight
    });

    return { error, documents, formattedDocuments, messages };
  }
}
</script>

<style>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .chat {
    margin: 18px 0;
  }
  .bubble {
    border: solid 1px grey;
    border-radius: 14px;
    padding: 8px 14px 8px 14px;
    background: white;
  }
  .created {
    display: block;
    color: #999;
    font-size: 12px;
    margin: 10px 0 8px 2px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }

</style>
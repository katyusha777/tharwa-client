<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch'
import SubtitleComponent from '~/components/elements/SubtitleComponent.vue'

const shariahCompliant = false

const isWatching = ref(false)
</script>

<template>
  <section>
    <header class="flex justify-between items-center mb-10">
      <div>
        <TitleComponent title="AAPL" :no-margin="true" />
        <p class="text-sm text-gray-500">
          NVIDIA Corporation
        </p>
      </div>
      <div class="flex justify-end">
        <SubtitleComponent title="Watching" class="mr-2" />
        <ToggleSwitch v-model="isWatching" />
      </div>
    </header>

    <section class="mb-12 flex justify-between">
      <KeyVal title="Current price" value="$2000" />
      <KeyVal title="Compliance">
        <BadgeComponent :title="shariahCompliant ? 'Halal' : 'Non-Halal'" :kind="shariahCompliant ? 'success' : 'fail'" :row-reverse="true" />
      </KeyVal>
      <KeyVal title="Sentiment">
        <SentimentScore :sentiment="1" />
      </KeyVal>
    </section>

    <section>
      <SubtitleComponent title="AI Analysis" class="mb-4" />
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nulla a sapien hendrerit feugiat sit amet porta felis. Nam feugiat, augue sed mattis maximus, massa erat sollicitudin felis, ac porta tortor orci sed massa. Integer maximus lobortis augue ut auctor. Fusce ut tellus accumsan, viverra turpis eget, euismod ante. Etiam sed convallis nisi. Proin sed pharetra nisl, a scelerisque quam. Curabitur in diam nisl. Vestibulum sem diam, auctor eget egestas posuere, aliquet rhoncus eros. Proin non lectus nec risus malesuada blandit. Ut efficitur sodales quam at consectetur. Vestibulum euismod sapien sed ornare lobortis. Curabitur enim diam, vestibulum a felis quis, tempor faucibus libero.</p>
    </section>
  </section>
</template>

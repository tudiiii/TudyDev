<template>
  <div id="global-layout">
    <component :is="$page.path ? 'Layout' : 'NotFound'" />
    <footer class="siteFooter">
      &copy; 수진
    </footer>
  </div>
</template>
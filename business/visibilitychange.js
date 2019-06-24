export default {
  mounted: {
    document.addEventListener('visibilitychange', this.handleVibility)
  },
  
  destoryed: {
    document.removeEventListener('visibilitychange', this.handleVisibiliy)
  },
  
  methods: {
    handleVibility() {
      if(document.visibilityState === 'hidden') return;
      this.fetchList();
    }
  }
}

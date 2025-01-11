<script lang="ts">
  import { onMount } from 'svelte';
  import Quagga from '@ericblade/quagga2';

  // Initialize the scanner
  const startScanner = () => {
    console.log('Initializing scanner...');
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#scanner-container') || undefined,
          constraints: {
            facingMode: 'environment', // Use the back camera
          },
        },
        decoder: {
          readers: ['ean_reader'], // Set the barcode format
        },
      },
      (err: any) => {
        if (err) {
          console.error('Quagga initialization failed:', err);
          alert('Failed to initialize the scanner');
          return;
        }
        console.log('Scanner initialized successfully');
        Quagga.start(); // Start the scanner
      }
    );

    Quagga.onDetected((data: { codeResult: { code: string | null } }) => {
      const scannedBarcode = data.codeResult.code;
      if (scannedBarcode) {
        localStorage.setItem('scannedBarcode', scannedBarcode); // Store the barcode
        window.close(); // Close the scanner tab after scanning
      }
    });
  };

  onMount(() => {
    startScanner(); // Start the scanner when the component mounts
  });
</script>

<div class="scanner-layout">
  <!-- Label on top of the scanner -->
  <div class="scanner-label">
    <p>Place the barcode in front of the camera</p>
  </div>

  <!-- Scanner Container -->
  <div id="scanner-container" class="scanner-container">
    <!-- Video feed from the scanner -->
  </div>

</div>

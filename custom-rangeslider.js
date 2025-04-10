(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll('[fs-rangeslider]');

    sliders.forEach(slider => {
      const customSteps = [];
      let stepIndex = 1;

      // Collect custom step values
      while (slider.hasAttribute(`fs-rangeslider-step-${stepIndex}`)) {
        const value = parseFloat(slider.getAttribute(`fs-rangeslider-step-${stepIndex}`));
        if (!isNaN(value)) {
          customSteps.push(value);
        }
        stepIndex++;
      }

      // If custom steps exist, override default behaviour
      if (customSteps.length > 0) {
        slider.min = 0;
        slider.max = customSteps.length - 1;
        slider.step = 1;

        // Create display element if not present
        let output = document.querySelector(`[for='${slider.id}']`);
        if (!output) {
          output = document.createElement('span');
          output.setAttribute('for', slider.id);
          slider.insertAdjacentElement('afterend', output);
        }

        // Optional: hidden input to store real value
        const realValueInput = document.createElement('input');
        realValueInput.type = 'hidden';
        realValueInput.name = slider.name || `${slider.id}-value`;
        slider.insertAdjacentElement('afterend', realValueInput);

        // Sync display and hidden input
        const updateSlider = () => {
          const index = parseInt(slider.value, 10);
          const realValue = customSteps[index];
          output.textContent = realValue;
          realValueInput.value = realValue;
        };

        updateSlider();

        slider.addEventListener('input', updateSlider);
        slider.addEventListener('change', updateSlider);
      }
      // Fallback: default step-based range
      else {
        const step = slider.getAttribute('fs-rangeslider-step');
        if (step !== null) {
          slider.step = step;
        }

        // Create display element
        let output = document.querySelector(`[for='${slider.id}']`);
        if (!output) {
          output = document.createElement('span');
          output.setAttribute('for', slider.id);
          slider.insertAdjacentElement('afterend', output);
        }

        const updateOutput = () => {
          output.textContent = slider.value;
        };

        updateOutput();
        slider.addEventListener('input', updateOutput);
        slider.addEventListener('change', updateOutput);
      }
    });
  });
})();


    (() => {
      const STORAGE_KEY = "customer-service-queue-v1";
      const form = document.querySelector("#ticket-form");
      const formNotice = document.querySelector("#form-notice");
      const queueNotice = document.querySelector("#queue-notice");
      let queueState = loadQueue();

      function loadQueue() {
        try {
          const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
          return {
            nextNumber: Number.isInteger(saved.nextNumber) && saved.nextNumber > 0 ? saved.nextNumber : 1,
            waiting: Array.isArray(saved.waiting) ? saved.waiting : [],
            current: saved.current && typeof saved.current === "object" ? saved.current : null
          };
        } catch (error) {
          console.error("No se pudo cargar la fila guardada.", error);
          return { nextNumber: 1, waiting: [], current: null };
        }
      }

      function saveQueue() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(queueState));
        } catch (error) {
          console.error("No se pudo guardar la fila.", error);
          queueNotice.textContent = "No se pudo guardar el estado en este navegador.";
        }
      }

      function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (character) => ({
          "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[character]);
      }

      function renderTicket(ticket) {
        return `<p class="ticket-detail"><span class="ticket-id">Turno ${escapeHtml(ticket.id)}</span><br>${escapeHtml(ticket.name)} · ${escapeHtml(ticket.topic)}</p>`;
      }

      function render() {
        document.querySelector("#waiting-count").textContent = queueState.waiting.length;
        document.querySelector("#current-ticket").innerHTML = queueState.current
          ? renderTicket(queueState.current)
          : '<p class="empty-state">Aún no hay una atención en curso.</p>';

        const waitingContainer = document.querySelector("#waiting-tickets");
        if (queueState.waiting.length === 0) {
          waitingContainer.innerHTML = '<p class="empty-state">La fila está vacía. Puedes solicitar un turno.</p>';
        } else {
          waitingContainer.innerHTML = `<ol class="queue-list">${queueState.waiting.slice(0, 4).map((ticket) =>
            `<li><span><strong>${escapeHtml(ticket.id)}</strong> · ${escapeHtml(ticket.name)}</span><span>${escapeHtml(ticket.topic)}</span></li>`
          ).join("")}</ol>${queueState.waiting.length > 4 ? `<p class="empty-state">Y ${queueState.waiting.length - 4} turno(s) más en espera.</p>` : ""}`;
        }
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const data = new FormData(form);
        const ticket = {
          id: `A-${String(queueState.nextNumber).padStart(3, "0")}`,
          name: data.get("name").trim(),
          email: data.get("email").trim(),
          topic: data.get("topic"),
          message: data.get("message").trim()
        };

        queueState.nextNumber += 1;
        queueState.waiting.push(ticket);
        saveQueue();
        render();
        form.reset();
        formNotice.textContent = `Tu turno ${ticket.id} fue registrado. Te atenderemos en orden de llegada.`;
        queueNotice.textContent = "";
      });

      document.querySelector("#call-next").addEventListener("click", () => {
        if (queueState.current) {
          queueNotice.textContent = "Finaliza la atención actual antes de llamar al siguiente turno.";
          return;
        }
        if (queueState.waiting.length === 0) {
          queueNotice.textContent = "No hay turnos pendientes.";
          return;
        }
        queueState.current = queueState.waiting.shift();
        saveQueue();
        render();
        queueNotice.textContent = `Turno ${queueState.current.id} llamado para atención.`;
      });

      document.querySelector("#finish-current").addEventListener("click", () => {
        if (!queueState.current) {
          queueNotice.textContent = "No hay una atención activa para finalizar.";
          return;
        }
        const finishedId = queueState.current.id;
        queueState.current = null;
        saveQueue();
        render();
        queueNotice.textContent = `La atención del turno ${finishedId} finalizó.`;
      });

      render();
    })();
  
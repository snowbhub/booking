export type Locale = "en" | "de" | "uk"
export const SUPPORTED_LOCALES:Locale[]=["en","de","uk"]
export const ROWS=[
  {
    "es": "Services without any rank restrictions are available to all levels. When you add a rule for one service, only levels explicitly allowed can book it. Different prices or durations must be configured as separate services, e.g. “Trainee haircut” and “Senior haircut”.",
    "en": "Services without any rank restrictions are available to all levels. When you add a rule for one service, only levels explicitly allowed can book it. Different prices or durations must be configured as separate services, e.g. “Trainee haircut” and “Senior haircut”.",
    "de": "Leistungen ohne Einschränkungen stehen allen Stufen zur Verfügung. Wird eine Regel erstellt, dürfen nur ausdrücklich zugelassene Stufen diese Leistung buchen. Unterschiedliche Preise oder Dauern werden als eigene Leistungen angelegt.",
    "uk": "Послуги без обмежень доступні всім рівням. Якщо для послуги встановлено правило, запис можливий лише для дозволених рівнів. Різні ціни або тривалість потрібно налаштовувати як окремі послуги."
  },
  {
    "es": "Configure GEMINI_API_KEY (or ANTHROPIC_API_KEY), ZERNIO_API_KEY and ZERNIO_WEBHOOK_SECRET in your Railway service variables. Then connect messaging accounts under Settings → Connections. No AI can respond without these credentials.",
    "en": "Configure GEMINI_API_KEY (or ANTHROPIC_API_KEY), ZERNIO_API_KEY and ZERNIO_WEBHOOK_SECRET in your Railway service variables. Then connect messaging accounts under Settings → Connections. No AI can respond without these credentials.",
    "de": "Hinterlege GEMINI_API_KEY (oder ANTHROPIC_API_KEY), ZERNIO_API_KEY und ZERNIO_WEBHOOK_SECRET in den Railway-Umgebungsvariablen. Verbinde anschließend die Nachrichtendienste unter Einstellungen → Verbindungen. Ohne diese Zugangsdaten kann die KI nicht antworten.",
    "uk": "Додайте GEMINI_API_KEY (або ANTHROPIC_API_KEY), ZERNIO_API_KEY та ZERNIO_WEBHOOK_SECRET у змінні сервісу Railway. Потім підключіть месенджери в розділі «Налаштування → Підключення». Без цих ключів AI-асистент не зможе відповідати."
  },
  {
    "es": "Para los clientes que vienen siempre el mismo día y hora. Ese horario deja de ofrecerse a los demás, por WhatsApp, Instagram y en la reserva web. Cuando el cliente llega, se anota con Turno rápido.",
    "en": "Clients who always come on the same day and time can reserve a fixed slot. That slot is no longer offered to others through WhatsApp, Instagram or online booking. When the client arrives, create their appointment with Quick booking.",
    "de": "Kunden, die immer am selben Tag und zur selben Zeit kommen, können einen festen Termin reservieren. Dieser Zeitraum wird anderen nicht über WhatsApp, Instagram oder die Online-Buchung angeboten. Wenn der Kunde ankommt, lege den Termin über „Schnellbuchung“ an.",
    "uk": "Клієнти, які приходять у той самий день і час, можуть забронювати постійний слот. Цей час не пропонується іншим через WhatsApp, Instagram або онлайн-запис. Коли клієнт прийде, створіть запис через «Швидкий запис»."
  },
  {
    "es": "Cada servicio con corte suma un sello. Con 5 sellos, el siguiente corte sale 50% off — la misma regla de la tarjeta física que ya entregan. El descuento se aplica solo al cobrar.",
    "en": "Each haircut earns one loyalty stamp. After 5 stamps, the next haircut is 50% off under the loyalty card rule. The discount is applied at checkout.",
    "de": "Für jeden passenden Haarschnitt gibt es einen Treuestempel. Nach 5 Stempeln ist der nächste Haarschnitt 50 % günstiger. Der Rabatt wird gemäß der Treuekartenregel beim Bezahlen abgezogen.",
    "uk": "За кожну відповідну стрижку нараховується одна відмітка лояльності. Після 5 відміток наступна стрижка буде зі знижкою 50%. Знижка застосовується під час оплати."
  },
  {
    "es": "Es lo que ven los clientes al reservar y lo que ofrece el agente. Los turnos ya cargados no cambian. Cuánto dura cada turno lo define el servicio, en la pestaña Servicios.",
    "en": "This is what clients see when booking and what the AI Agent offers. Existing bookings do not change. Service duration is set on the Services tab.",
    "de": "Das sehen Kunden bei der Buchung und das bietet der KI-Assistent an. Bestehende Termine bleiben unverändert. Die Dauer wird im Tab „Leistungen“ je Leistung festgelegt.",
    "uk": "Це бачать клієнти під час запису й це пропонує AI-асистент. Уже створені записи не змінюються. Тривалість послуги задається на вкладці «Послуги»."
  },
  {
    "es": "Current commission rates are applied to payments within the selected period. Historical rate changes are not tracked yet. Deposits are included when collected.",
    "en": "Current commission rates are applied to payments within the selected period. Historical rate changes are not tracked yet. Deposits are included when collected.",
    "de": "Für den ausgewählten Zeitraum gelten aktuelle Provisionssätze. Frühere Änderungen werden noch nicht erfasst. Anzahlungen werden beim Zahlungseingang berücksichtigt.",
    "uk": "Для вибраного періоду використовуються поточні відсотки комісії. Історія зміни відсотків поки не зберігається. Передоплати враховуються в момент отримання."
  },
  {
    "es": " Incluye el historial del Excel de antes del panel: ingresos, gastos y cortes por barbero. Turnos atendidos y ocupación cuentan desde que se usa la agenda.",
    "en": " Includes imported historical data: revenue, expenses and services by staff member. Completed bookings and occupancy are counted from the point the schedule started being used.",
    "de": " Enthält importierte historische Daten: Umsatz, Ausgaben und Leistungen pro Mitarbeiter. Erledigte Termine und Auslastung zählen ab Nutzung des Kalenders.",
    "uk": " Містить імпортовану історію: доходи, витрати та послуги за майстрами. Обслуговані записи й завантаженість рахуються від початку використання календаря."
  },
  {
    "es": "Amount due = commission + tips − advances − payments already made. Owners do not receive commissions; revenue from their services belongs to the business.",
    "en": "Amount due = commission + tips − advances − payments already made. Owners do not receive commissions; revenue from their services belongs to the business.",
    "de": "Auszahlung = Provision + Trinkgeld − Vorschüsse − bereits gezahlte Beträge. Eigentümer erhalten keine Provision; deren Umsatz verbleibt im Betrieb.",
    "uk": "До виплати = комісія + чайові − аванси − вже виплачені кошти. Власники не отримують комісію; їхня виручка залишається закладу."
  },
  {
    "es": "Amount due = commission + tips − advances − payments already made. Owners do not receive commissions; revenue from their services belongs to the business",
    "en": "Amount due = commission + tips − advances − payments already made. Owners do not receive commissions; revenue from their services belongs to the business",
    "de": "Auszahlung = Provision + Trinkgeld − Vorschüsse − bereits geleistete Zahlungen. Eigentümer erhalten keine Provisionen; ihr Leistungsumsatz bleibt im Betrieb",
    "uk": "До виплати = комісія + чайові − аванси − вже сплачені суми. Власники не отримують комісійних; виручка від їхніх послуг залишається закладу"
  },
  {
    "es": "Cash movement shows net cash receipts and cash expenses for this period. It is not a verified cash-drawer balance; use the cash closing report for that.",
    "en": "Cash movement shows net cash receipts and cash expenses for this period. It is not a verified cash-drawer balance; use the cash closing report for that.",
    "de": "Die Kassenbewegung zeigt Bargeldeingänge abzüglich Barausgaben. Sie ersetzt nicht den geprüften Kassenbestand; nutze hierfür den Kassenabschluss.",
    "uk": "Рух готівки показує надходження за вирахуванням витрат. Це не підтверджений залишок у касі — для нього використовуйте звіт закриття каси."
  },
  {
    "es": "Modelo: sin configurar. Cada respuesta se arma con los precios, horarios y reglas from esta pantalla; la agenda la consulta en vivo, nunca from memoria.",
    "en": "Model not configured. Replies use the actual prices, hours and rules shown here; availability is checked live.",
    "de": "Modell nicht konfiguriert. Antworten verwenden die hier eingestellten Preise und Öffnungszeiten und prüfen Termine live.",
    "uk": "Модель не налаштована. Відповіді використовують поточні ціни, години роботи та правила; доступність перевіряється в календарі."
  },
  {
    "es": "Estimate = configured opening cash + cash sales − cash expenses + cash deposits − withdrawals. Verify the physical drawer amount during cash closing.",
    "en": "Estimate = configured opening cash + cash sales − cash expenses + cash deposits − withdrawals. Verify the physical drawer amount during cash closing.",
    "de": "Geschätzter Kassenbestand = Anfangsbestand + Barumsatz − Barausgaben + Einlagen − Entnahmen. Prüfe den tatsächlichen Bestand beim Kassenabschluss.",
    "uk": "Очікуваний залишок = початкова готівка + продажі готівкою − витрати готівкою + внесення − вилучення. Фактичну суму перевіряйте під час закриття каси."
  },
  {
    "es": "Create individual passwords for barbers. Staff users only access their own schedule and the booking form; finances and settings remain admin-only.",
    "en": "Create individual passwords for barbers. Staff users only access their own schedule and the booking form; finances and settings remain admin-only.",
    "de": "Vergib persönliche Passwörter. Mitarbeitende sehen nur ihren Dienstplan und das Buchungsformular; Finanzen und Einstellungen bleiben der Verwaltung vorbehalten.",
    "uk": "Створюйте індивідуальні паролі. Співробітники бачать лише свій графік і форму запису; фінанси та налаштування доступні тільки адміністратору."
  },
  {
    "es": "Generá el link y mandáselo al dueño: lo abre en una compu y escanea el QR con el celular del local (sigue usando WhatsApp Business como siempre).",
    "en": "Generate the link and send it to the owner. Open it on a computer and scan the QR code with the business phone; WhatsApp Business can still be used normally.",
    "de": "Link erzeugen und an den Inhaber senden. Auf einem Computer öffnen und den QR-Code mit dem Geschäftshandy scannen; WhatsApp Business kann weiter normal genutzt werden.",
    "uk": "Створіть посилання й надішліть власнику. Відкрийте його на комп’ютері та відскануйте QR-код телефоном закладу; WhatsApp Business можна й далі використовувати як звичайно."
  },
  {
    "es": "Para los clientes que vienen siempre el mismo día y hora. Ese horario deja de ofrecerse a los demás, por WhatsApp, Instagram y en la reserva web.",
    "en": "For clients who always come on the same day and time. That slot is no longer offered to others via WhatsApp, Instagram or online booking.",
    "de": "Für Kunden, die immer am selben Tag und zur selben Zeit kommen. Dieser Zeitraum wird anderen über WhatsApp, Instagram oder Online-Buchung nicht mehr angeboten.",
    "uk": "Для клієнтів, які завжди приходять у той самий день і час. Цей час більше не пропонується іншим у WhatsApp, Instagram чи онлайн-записі."
  },
  {
    "es": "Uh Ezequiel, lamento mucho eso. Ya le aviso a Santiago para que lo vea personalmente y te escriba en un rato para solucionarlo. 🙏",
    "en": "I'm sorry about that. I'll pass this to the team so someone can review it and contact you shortly. 🙏",
    "de": "Das tut mir leid. Ich gebe es ans Team weiter, damit es geprüft wird und sich gleich jemand bei dir meldet. 🙏",
    "uk": "Шкода, що так сталося. Я передам це команді, щоб ситуацію перевірили й незабаром з вами зв’язалися. 🙏"
  },
  {
    "es": "¡Hola Carla! El sábado a las 11:00 tengo lugar con Santiago para un corte ($15.000, una hora). ¿Lo reservo a nombre de Bautista?",
    "en": "Hi! Saturday at 11:00 is available for a one-hour Haircut. Shall I book it for Bautista?",
    "de": "Hallo! Samstag um 11:00 ist ein einstündiger Haarschnitt frei. Soll ich für Bautista buchen?",
    "uk": "Привіт! У суботу об 11:00 є вільний час на годинну стрижку. Записати Баутісту?"
  },
  {
    "es": "¡Hola Tomi! Por ahora en el local hacemos corte y corte + barba. Igual le paso tu consulta a Santiago para que te responda él 🙌",
    "en": "Hi! At the moment we offer haircut and haircut + beard. I'll pass your question to the team so they can reply. 🙌",
    "de": "Hallo! Aktuell bieten wir Haarschnitt und Haarschnitt + Bart an. Ich gebe deine Frage ans Team weiter. 🙌",
    "uk": "Привіт! Зараз ми пропонуємо стрижку та стрижку + бороду. Я передам питання команді, щоб вам відповіли. 🙌"
  },
  {
    "es": "Por ahora el local hace sólo corte y corte + barba. Si piden otra cosa (color, diseño, barba sola), decilo y derivá a Santiago.",
    "en": "For now, only the configured core services are offered. If someone asks for something else, say so and hand it off to a person.",
    "de": "Aktuell werden nur die konfigurierten Kernleistungen angeboten. Bei anderen Anfragen darauf hinweisen und an eine Person übergeben.",
    "uk": "Наразі доступні лише налаштовані основні послуги. Якщо просять інше — повідомте про це й передайте людині."
  },
  {
    "es": "¡Hola Tomi! Por ahora en el local hacemos corte y corte + barba. Igual le paso tu consulta a Santiago para que te responda él 🙌",
    "en": "Hi! At the moment we offer the configured core services. I'll pass your question to the team so they can reply. 🙌",
    "de": "Hallo! Aktuell bieten wir die konfigurierten Kernleistungen an. Ich gebe deine Frage ans Team weiter. 🙌",
    "uk": "Привіт! Зараз ми надаємо основні налаштовані послуги. Передам ваше питання команді. 🙌"
  },
  {
    "es": "Por ahora el local hace sólo corte y corte + barba. Si piden otra cosa (color, diseño, barba sola), decilo y derivá a Santiago.",
    "en": "For now, only the configured core services are offered. If someone asks for something else, say so and hand it off to a person.",
    "de": "Aktuell werden nur die konfigurierten Kernleistungen angeboten. Bei anderen Anfragen darauf hinweisen und an eine Person übergeben.",
    "uk": "Наразі доступні лише налаштовані основні послуги. Якщо просять інше — повідомте про це й передайте людині."
  },
  {
    "es": "Responde WhatsApp e Instagram, agenda, reprograma y cancela turnos solo, y le pasa a una persona lo que no le corresponde.",
    "en": "Handles WhatsApp and Instagram, creates, reschedules and cancels bookings, and hands off anything that needs a person.",
    "de": "Bearbeitet WhatsApp und Instagram, erstellt, verschiebt und storniert Termine und übergibt alles Weitere an eine Person.",
    "uk": "Працює з WhatsApp та Instagram, створює, переносить і скасовує записи та передає людині те, що потребує її участі."
  },
  {
    "es": "Handles WhatsApp and Instagram, creates, reschedules and cancels bookings, and hands off anything that needs to person.",
    "en": "Handles WhatsApp and Instagram, manages bookings and transfers conversations that need a staff member.",
    "de": "Bearbeitet WhatsApp und Instagram, verwaltet Termine und übergibt Gespräche bei Bedarf an Mitarbeitende.",
    "uk": "Працює з WhatsApp та Instagram, керує записами й за потреби передає розмови співробітникам."
  },
  {
    "es": "A pagar = comisión + tips − vales − pagos ya hechos. Los owners no cobran comisión: lo que facturan queda en la casa",
    "en": "To pay = commission + tips − advances − payments already made. Owners do not receive commission; their revenue stays with the business.",
    "de": "Auszahlung = Provision + Trinkgeld − Vorschüsse − bereits geleistete Zahlungen. Inhaber erhalten keine Provision; ihr Umsatz bleibt im Betrieb.",
    "uk": "До виплати = комісія + чайові − аванси − вже зроблені виплати. Власники не отримують комісію; їхній дохід залишається закладу."
  },
  {
    "es": "To pay = comisión + tips − vales − pagos ya hechos. Los owners no cobran comisión: lo que facturan queda en la casa.",
    "en": "Amount due = commission + tips − advances − payments made. Owners do not earn commissions; their service revenue belongs to the business.",
    "de": "Auszahlung = Provision + Trinkgeld − Vorschüsse − bereits geleistete Zahlungen. Eigentümer erhalten keine Provision.",
    "uk": "До виплати = комісія + чайові − аванси − вже сплачені кошти. Власники не отримують комісію: їхня виручка залишається закладу."
  },
  {
    "es": "Listo, quedó reservado el sábado a las 11:00 con Santiago para Bautista ✂️ Te lo confirmo el viernes por este chat.",
    "en": "Done, Saturday at 11:00 is booked for Bautista ✂️ I'll confirm it here on Friday.",
    "de": "Fertig, Samstag um 11:00 ist für Bautista gebucht ✂️ Ich bestätige es am Freitag hier im Chat.",
    "uk": "Готово, Баутісту записано на суботу об 11:00 ✂️ У п’ятницю підтверджу тут у чаті."
  },
  {
    "es": "Con este monto arranca la caja cada día: el efectivo esperado es fondo + cobros en efectivo − gastos en efectivo.",
    "en": "The cash register starts each day with this amount: expected cash = opening float + cash payments − cash expenses.",
    "de": "Mit diesem Betrag startet die Kasse täglich: erwartetes Bargeld = Startbestand + Bareinnahmen − Barausgaben.",
    "uk": "З цієї суми щодня починається каса: очікувана готівка = стартова сума + готівкові оплати − готівкові витрати."
  },
  {
    "es": "Semana en curso, de lunes a domingo. Cada uno ve cuánto le toca, qué vales tiene y cuánto le queda a la casa.",
    "en": "Current week, Monday to Sunday. Shows each staff payout, advances and what remains for the business.",
    "de": "Laufende Woche von Montag bis Sonntag. Zeigt Auszahlungen, Vorschüsse und den Anteil des Betriebs.",
    "uk": "Поточний тиждень з понеділка по неділю. Показує виплати кожному, аванси та залишок закладу."
  },
  {
    "es": ". Replies use the configured prices, opening hours and rules. The calendar is checked live, not from memory.",
    "en": ". Replies use the configured prices, opening hours and rules. The calendar is checked live, not from memory.",
    "de": ". Antworten verwenden die festgelegten Preise, Öffnungszeiten und Regeln. Die Verfügbarkeit wird live im Kalender geprüft, nicht aus dem Gedächtnis.",
    "uk": ". Відповіді використовують налаштовані ціни, години роботи та правила. Доступність перевіряється безпосередньо в календарі, а не з пам’яті."
  },
  {
    "es": "Select an employee to update their commission, working hours and access. Payroll is managed under Finance.",
    "en": "Select an employee to update their commission, working hours and access. Payroll is managed under Finance.",
    "de": "Wähle Mitarbeitende aus, um Provision, Arbeitszeiten und Zugriffsrechte zu bearbeiten. Gehaltsabrechnungen findest du unter Finanzen.",
    "uk": "Оберіть співробітника, щоб змінити відсоток комісії, графік роботи й права доступу. Розрахунки зарплат — у розділі «Фінанси»."
  },
  {
    "es": "Record expenses by category and payee, cash deposits, and withdrawals without treating transfers as sales.",
    "en": "Record expenses by category and payee, cash deposits, and withdrawals without treating transfers as sales.",
    "de": "Erfasse Ausgaben nach Kategorie und Empfänger sowie Bareinlagen und Entnahmen, ohne Umbuchungen als Umsatz zu zählen.",
    "uk": "Облік витрат за категоріями й отримувачами, внесення та вилучення готівки без зарахування переказів до продажів."
  },
  {
    "es": "El local está cerrado a esta hora, así que la demo simula una tarde de trabajo. Los datos son de ejemplo.",
    "en": "The business is closed at this time, so the demo simulates an active workday. The data is for demonstration.",
    "de": "Der Betrieb ist derzeit geschlossen, daher simuliert die Demo einen Arbeitstag. Die Daten sind Beispieldaten.",
    "uk": "Зараз заклад зачинений, тому демо імітує робочий день. Дані демонстраційні."
  },
  {
    "es": "Booking atiende de martes a sábado de 11 a 20. El agente igual responde y agenda para los días hábiles.",
    "en": "Open Tuesday to Saturday, 11:00–20:00. The AI Agent can still answer and create bookings for open days.",
    "de": "Geöffnet Dienstag bis Samstag, 11:00–20:00. Der KI-Assistent antwortet weiterhin und erstellt Termine für Öffnungstage.",
    "uk": "Працюємо з вівторка по суботу, 11:00–20:00. AI-асистент продовжує відповідати й створювати записи на робочі дні."
  },
  {
    "es": "El {canal} de Booking quedó conectado. Ya podés cerrar esta ventana: seguís usando la app como siempre.",
    "en": "The {canal} connection is complete. You can close this window and continue using the app.",
    "de": "Die {canal}-Verbindung ist hergestellt. Du kannst dieses Fenster schließen und die App weiter nutzen.",
    "uk": "Підключення {canal} завершено. Можна закрити це вікно й продовжити користуватися застосунком."
  },
  {
    "es": "Fuera de horario igual podés agendar, pero aclarás que el local atiende de martes a sábado de 11 a 20.",
    "en": "Bookings can still be created outside opening hours, but clearly state the configured business hours.",
    "de": "Auch außerhalb der Öffnungszeiten können Termine erstellt werden; die Öffnungszeiten klar nennen.",
    "uk": "Записи можна створювати й поза робочим часом, але потрібно чітко повідомляти години роботи."
  },
  {
    "es": "Fuera de horario igual podés agendar, pero aclarás que el local atiende de martes a sábado de 11 a 20.",
    "en": "Bookings can still be created outside opening hours, but clearly state the configured business hours.",
    "de": "Auch außerhalb der Öffnungszeiten können Termine erstellt werden; die Öffnungszeiten klar nennen.",
    "uk": "Записи можна створювати й поза робочим часом, але потрібно чітко повідомляти години роботи."
  },
  {
    "es": "Si no llega el pago a tiempo, el horario se libera solo. El resto se cobra en el local, ya descontado.",
    "en": "If payment does not arrive in time, the slot is released automatically. The remaining amount is collected on site after deducting the deposit.",
    "de": "Wenn die Zahlung nicht rechtzeitig eingeht, wird der Termin automatisch freigegeben. Der Restbetrag wird vor Ort abzüglich der Anzahlung kassiert.",
    "uk": "Якщо оплата не надійде вчасно, час автоматично звільниться. Решта сплачується в закладі з урахуванням передоплати."
  },
  {
    "es": "Handles WhatsApp and Instagram, manages bookings, and transfers conversations needing a staff member.",
    "en": "Handles WhatsApp and Instagram, manages bookings, and transfers conversations needing a staff member.",
    "de": "Bearbeitet WhatsApp und Instagram, verwaltet Buchungen und übergibt Gespräche bei Bedarf an Mitarbeitende.",
    "uk": "Працює з WhatsApp та Instagram, керує записами й за потреби передає розмови співробітникам."
  },
  {
    "es": "Hoy me quedan ${slotsToday.map(({ t, s }) => `${t} con ${s.name}`).join(\", \")}. ¿Te reservo alguno?",
    "en": "Today I have ${slotsToday.map(({ t, s }) => `${t} with ${s.name}`).join(\", \")} available. Should I book one?",
    "de": "Heute sind ${slotsToday.map(({ t, s }) => `${t} bei ${s.name}`).join(\", \")} frei. Soll ich einen Termin buchen?",
    "uk": "Сьогодні вільно: ${slotsToday.map(({ t, s }) => `${t} у ${s.name}`).join(\", \")}. Записати?"
  },
  {
    "es": "Falta ZERNIO_WEBHOOK_SECRET. Es el mismo valor que se registra en Zernio al dar de alta el webhook.",
    "en": "ZERNIO_WEBHOOK_SECRET is missing. Add the same secret in Zernio's webhook settings and in this service's environment variables.",
    "de": "ZERNIO_WEBHOOK_SECRET fehlt. Hinterlege dasselbe Geheimnis in den Webhook-Einstellungen von Zernio und in den Umgebungsvariablen dieses Dienstes.",
    "uk": "Відсутній ZERNIO_WEBHOOK_SECRET. Додайте той самий секрет у налаштуваннях вебхука Zernio та у змінних середовища цього сервісу."
  },
  {
    "es": "Falta GEMINI_API_KEY is missing from the server environment. The AI Agent cannot reply without it.",
    "en": "GEMINI_API_KEY is missing from the server environment. The AI Agent cannot reply without it.",
    "de": "GEMINI_API_KEY fehlt in den Servervariablen. Der KI-Assistent kann ohne diesen Schlüssel nicht antworten.",
    "uk": "У змінних сервера відсутній GEMINI_API_KEY. Без цього ключа AI-асистент не може відповідати."
  },
  {
    "es": "Edit to staff member to set their commission percentage. Weekly payroll is shown under Finance.",
    "en": "Choose a staff member to change their commission. Payroll is available under Finance.",
    "de": "Wähle Mitarbeitende aus, um die Provision zu ändern. Gehaltsabrechnungen findest du unter Finanzen.",
    "uk": "Оберіть співробітника, щоб змінити відсоток комісії. Розрахунок зарплати доступний у розділі «Фінанси»."
  },
  {
    "es": "Misma hora y servicio. Si el cliente pidió a alguien en particular, avisale antes de cambiarlo.",
    "en": "Same time and service. If the client requested someone specific, let them know before changing.",
    "de": "Gleiche Zeit und Leistung. Wenn der Kunde eine bestimmte Person gewählt hat, vorher informieren.",
    "uk": "Той самий час і послуга. Якщо клієнт обрав конкретного майстра, попередьте його перед зміною."
  },
  {
    "es": "Edit a staff member to set their commission percentage. Weekly payroll is shown under Finance.",
    "en": "Edit a staff member to set their commission percentage. Weekly payroll is shown under Finance.",
    "de": "Bearbeite ein Teammitglied, um den Provisionssatz festzulegen. Die wöchentliche Abrechnung findest du unter Finanzen.",
    "uk": "Відкрийте редагування співробітника, щоб встановити відсоток комісії. Тижневі виплати показано у Фінансах."
  },
  {
    "es": "Devuelve cuántos sellos tiene el cliente en la tarjeta de fidelidad y si payout el descuento.",
    "en": "Returns the client loyalty stamp count and whether the reward discount is ready.",
    "de": "Gibt die Anzahl der Treuestempel und die Verfügbarkeit der Prämie zurück.",
    "uk": "Повертає кількість штампів лояльності та чи доступна винагорода."
  },
  {
    "es": "Currency used for prices, bookings and financial reports. Existing amounts are not converted.",
    "en": "Currency used for prices, bookings and financial reports. Existing amounts are not converted.",
    "de": "Diese Währung wird für Preise, Termine und Finanzberichte verwendet. Bestehende Beträge werden nicht umgerechnet.",
    "uk": "Ця валюта використовується для цін, записів і фінансових звітів. Наявні суми не перераховуються."
  },
  {
    "es": "El agente responde solo las que están en modo IA. Las marcadas en rojo esperan a una persona.",
    "en": "The AI Agent only answers conversations in AI mode. Red conversations are waiting for a person.",
    "de": "Der KI-Assistent beantwortet nur Unterhaltungen im KI-Modus. Rot markierte warten auf eine Person.",
    "uk": "AI-асистент відповідає лише в режимі AI. Червоні розмови очікують людину."
  },
  {
    "es": "Joaco, te guardé el sábado 12:00 👌 Vení con el pelo lavado y hacemos corte + barba a navaja.",
    "en": "Saturday 12:00 is reserved 👌 Come with clean hair and we'll do hair + beard.",
    "de": "Samstag 12:00 ist reserviert 👌 Komm mit gewaschenen Haaren, dann machen wir Haare + Bart.",
    "uk": "Суботу 12:00 зарезервовано 👌 Приходьте з чистим волоссям, зробимо стрижку + бороду."
  },
  {
    "es": "Joaco, te guardé el sábado 12:00 👌 Vení con el pelo lavado y hacemos corte + barba a navaja.",
    "en": "Saturday 12:00 is reserved 👌 Come with clean hair and we'll provide the booked service.",
    "de": "Samstag 12:00 ist reserviert 👌 Komm mit gewaschenen Haaren, dann machen wir die gebuchte Leistung.",
    "uk": "Суботу на 12:00 зарезервовано 👌 Приходьте з чистим волоссям — зробимо записану послугу."
  },
  {
    "es": "Edit a staff member to set their commission percentage. Weekly payouts appear under Finance.",
    "en": "Edit a staff member to set their commission percentage. Weekly payouts appear under Finance.",
    "de": "Bearbeite ein Teammitglied, um den Provisionssatz festzulegen. Wöchentliche Auszahlungen stehen unter Finanzen.",
    "uk": "Відредагуйте співробітника, щоб встановити відсоток комісії. Тижневі виплати відображаються у фінансах."
  },
  {
    "es": "GEMINI_API_KEY is missing from the server environment. The AI Agent cannot reply without it.",
    "en": "GEMINI_API_KEY is missing from the server environment. The AI Agent cannot reply without it.",
    "de": "GEMINI_API_KEY fehlt in den Servervariablen. Der KI-Assistent kann ohne diesen Schlüssel nicht antworten.",
    "uk": "У змінних сервера відсутній GEMINI_API_KEY. Без цього ключа AI-асистент не може відповідати."
  },
  {
    "es": "Sin drama, Franco. Te lo pasé a las 19:00 con Sebastián, mismo servicio (Corte). ¿Te sirve?",
    "en": "No problem. I moved it to 19:00 with the same service. Does that work?",
    "de": "Kein Problem. Ich habe den Termin auf 19:00 mit derselben Leistung verschoben. Passt das?",
    "uk": "Без проблем. Я переніс запис на 19:00 з тією самою послугою. Підходить?"
  },
  {
    "es": "Sin drama, Franco. Te lo pasé a las 19:00 con Sebastián, mismo servicio (Corte). ¿Te sirve?",
    "en": "No problem. I moved it to 19:00 with the same service. Does that work?",
    "de": "Kein Problem. Ich habe den Termin auf 19:00 mit derselben Leistung verschoben. Passt das?",
    "uk": "Без проблем. Я переніс запис на 19:00 з тією самою послугою. Підходить?"
  },
  {
    "es": " dejaron de venir. Cada ficha guarda cómo se corta, sus visitas y su tarjeta de fidelidad.",
    "en": " at risk. Each profile keeps service notes, visit history and loyalty status.",
    "de": " gefährdet. Jedes Profil enthält Service-Notizen, Besuchsverlauf und Treuestatus.",
    "uk": " під ризиком. У кожному профілі є нотатки про послугу, історія візитів і статус лояльності."
  },
  {
    "es": "Lo que entró, por dónde entró y a quién le corresponde. El mes completo está en Finanzas.",
    "en": "What came in, how it was paid and who it belongs to. Full monthly reporting is under Finance.",
    "de": "Einnahmen, Zahlungsart und Zuordnung. Die vollständige Monatsübersicht findest du unter Finanzen.",
    "uk": "Що надійшло, яким способом і кому належить. Повний місячний звіт — у Фінансах."
  },
  {
    "es": "Payroll by date range: commissions, tips, advances, paid amounts, and remaining balance.",
    "en": "Payroll by date range: commissions, tips, advances, paid amounts, and remaining balance.",
    "de": "Gehaltsabrechnung nach Zeitraum: Provisionen, Trinkgeld, Vorschüsse, Auszahlungen und offener Betrag.",
    "uk": "Розрахунок зарплат за період: комісії, чайові, аванси, виплати та залишок."
  },
  {
    "es": "Change the name and commission with the pencil above; other employee details are below.",
    "en": "Change the name and commission with the pencil above; other employee details are below.",
    "de": "Name und Provision mit dem Stift oben ändern; weitere Mitarbeiterdaten stehen unten.",
    "uk": "Ім’я та відсоток змінюються кнопкою редагування вище. Інші дані співробітника — нижче."
  },
  {
    "es": "Write as to client. It checks the real schedule, but this is to test and saves nothing.",
    "en": "Write as a client. This test checks real availability without saving changes.",
    "de": "Schreibe als Kunde. Der Test prüft die tatsächliche Verfügbarkeit, ohne Daten zu speichern.",
    "uk": "Напишіть як клієнт. Тест перевіряє справжню доступність і нічого не зберігає."
  },
  {
    "es": "Todavía no es cliente. Cuando agende su primer turno se crea la ficha automáticamente.",
    "en": "Not a client yet. The profile is created automatically with the first booking.",
    "de": "Noch kein Kunde. Das Profil wird beim ersten Termin automatisch erstellt.",
    "uk": "Ще не клієнт. Профіль автоматично створиться після першого запису."
  },
  {
    "es": "El panel todavía no tiene contraseña: falta configurar PANEL_PASSWORD en el servidor.",
    "en": "The panel has no password yet: configure PANEL_PASSWORD on the server.",
    "de": "Das Panel hat noch kein Passwort: PANEL_PASSWORD auf dem Server konfigurieren.",
    "uk": "Панель ще не має пароля: налаштуйте PANEL_PASSWORD на сервері."
  },
  {
    "es": "Si alguien se queja de un corte, pedí disculpas y derivá a una persona de inmediato.",
    "en": "If someone complains about a service, apologize and hand the conversation to a person immediately.",
    "de": "Bei Beschwerden über eine Leistung entschuldigen und sofort an eine Person übergeben.",
    "uk": "Якщо клієнт скаржиться на послугу, вибачтесь і одразу передайте розмову людині."
  },
  {
    "es": "Si alguien se queja de un corte, pedí disculpas y derivá a una persona de inmediato.",
    "en": "If someone complains about a service, apologize and hand the conversation to a person immediately.",
    "de": "Bei Beschwerden über eine Leistung entschuldigen und sofort an eine Person übergeben.",
    "uk": "Якщо клієнт скаржиться на послугу, вибачтесь і одразу передайте розмову людині."
  },
  {
    "es": "Hoy el local está cerrado. El agente sigue respondiendo y agendando para la semana.",
    "en": "The business is closed today. The AI Agent keeps answering and creating bookings for the week.",
    "de": "Der Betrieb ist heute geschlossen. Der KI-Assistent beantwortet weiter Nachrichten und legt Termine für die Woche an.",
    "uk": "Сьогодні заклад зачинений. AI-асистент продовжує відповідати й створювати записи на тиждень."
  },
  {
    "es": "Escribile como un cliente. Mira la agenda real, pero es un ensayo: no guarda nada.",
    "en": "Write as a client. It checks the real schedule, but this is a test and saves nothing.",
    "de": "Schreibe wie ein Kunde. Der echte Kalender wird geprüft, aber im Test wird nichts gespeichert.",
    "uk": "Пишіть як клієнт. Перевіряється реальний календар, але це тест і нічого не зберігається."
  },
  {
    "es": "Para el que cae sin avisar. Por defecto arranca ya y se cobra después desde Caja.",
    "en": "For walk-ins. By default it starts now and is paid later from Cash.",
    "de": "Für Laufkundschaft. Standardmäßig beginnt der Termin jetzt und wird später über die Kasse bezahlt.",
    "uk": "Для клієнтів без попереднього запису. За замовчуванням починається зараз, оплата пізніше в Касі."
  },
  {
    "es": "El horario se libera solo si no llega la seña a tiempo. Podés intentar de nuevo.",
    "en": "The slot is released automatically if the deposit is not received in time. You can try again.",
    "de": "Der Termin wird automatisch freigegeben, wenn die Anzahlung nicht rechtzeitig eingeht. Du kannst es erneut versuchen.",
    "uk": "Час автоматично звільниться, якщо передоплата не надійде вчасно. Можна спробувати ще раз."
  },
  {
    "es": "No barbers added. Add staff under Settings → Team before creating appointments.",
    "en": "No barbers added. Add staff under Settings → Team before creating appointments.",
    "de": "Noch keine Barbiere. Füge unter Einstellungen → Team Mitarbeitende hinzu.",
    "uk": "Барберів ще немає. Спочатку додайте співробітників у Налаштуваннях → Команда."
  },
  {
    "es": "Las horas van de 5 en 5 minutos: 17:15 a 18:00, 17:00 a 17:45, lo que necesite.",
    "en": "You can choose times in 5-minute increments, such as 17:15–18:00 or 17:00–17:45.",
    "de": "Zeiten sind in 5-Minuten-Schritten wählbar, zum Beispiel 17:15–18:00 oder 17:00–17:45.",
    "uk": "Час можна вибирати з кроком 5 хвилин, наприклад 17:15–18:00 або 17:00–17:45."
  },
  {
    "es": "Falta cargar la clave de Mercado Pago en el servidor antes de activar la seña.",
    "en": "Configure the Mercado Pago key on the server before enabling deposits.",
    "de": "Vor Aktivierung der Anzahlung muss der Mercado-Pago-Schlüssel auf dem Server konfiguriert werden.",
    "uk": "Перед увімкненням передоплати налаштуйте ключ Mercado Pago на сервері."
  },
  {
    "es": "Hola, el corte de ayer me quedó desparejo del lado izquierdo, se nota bastante",
    "en": "Hi, yesterday's service turned out uneven on the left side and it is quite noticeable",
    "de": "Hallo, die Leistung gestern ist links ungleichmäßig geworden und das sieht man deutlich",
    "uk": "Привіт, учорашня стрижка вийшла нерівною зліва, це добре видно"
  },
  {
    "es": "Tap an empty time to add a booking, or tap an appointment to open its details.",
    "en": "Tap an empty time to add a booking, or tap an appointment to open its details.",
    "de": "Tippe auf eine freie Zeit, um einen Termin hinzuzufügen, oder auf einen Termin für Details.",
    "uk": "Натисніть на вільний час, щоб створити запис, або на запис, щоб переглянути деталі."
  },
  {
    "es": "Terminó: el horario que sobraba quedó libre y el cobro queda pendiente en Caja",
    "en": "Finished: unused time is free and payment remains pending in Cash",
    "de": "Beendet: Restzeit ist wieder frei, Zahlung bleibt in der Kasse offen",
    "uk": "Завершено: невикористаний час звільнено, оплата очікує в Касі"
  },
  {
    "es": "ZERNIO_API_KEY is missing. Create an API key in Zernio and add it to Railway.",
    "en": "ZERNIO_API_KEY is missing. Create an API key in Zernio and add it to Railway.",
    "de": "ZERNIO_API_KEY fehlt. Erstelle einen API-Schlüssel bei Zernio und füge ihn in Railway hinzu.",
    "uk": "Відсутній ZERNIO_API_KEY. Створіть API-ключ у Zernio та додайте його в Railway."
  },
  {
    "es": "Hace un tiempo que no te vemos por Booking 💈 ¿Te busco un turno esta semana?",
    "en": "We haven't seen you in a while. Would you like an appointment this week?",
    "de": "Wir haben dich länger nicht gesehen. Soll ich dir diese Woche einen Termin suchen?",
    "uk": "Давно вас не бачили. Знайти вам запис на цей тиждень?"
  },
  {
    "es": "está ocupado por un buen rato. Probá con otro barbero o agendalo a una hora.",
    "en": "is busy for a while. Try another staff member or book a specific time.",
    "de": "ist für eine Weile belegt. Wähle einen anderen Mitarbeiter oder buche eine konkrete Uhrzeit.",
    "uk": "ще певний час зайнятий. Спробуйте іншого майстра або виберіть конкретний час."
  },
  {
    "es": "Change employee name, commission and profile details using the pencil above.",
    "en": "Change employee name, commission and profile details using the pencil above.",
    "de": "Name, Provision und Profil über den Stift oben bearbeiten.",
    "uk": "Змініть ім’я, комісію та профіль співробітника кнопкою редагування вище."
  },
  {
    "es": "Lo que acá se cambia lo usan la agenda, la caja y el agente al mismo tiempo.",
    "en": "Changes here are used by the schedule, cash and AI Agent at the same time.",
    "de": "Änderungen hier gelten gleichzeitig für Kalender, Kasse und KI-Assistent.",
    "uk": "Зміни тут одночасно використовують календар, каса та AI-асистент."
  },
  {
    "es": "Mes en curso. Las comparaciones son contra los mismos días del mes anterior.",
    "en": "Current month. Comparisons use the same days of the previous month.",
    "de": "Laufender Monat. Verglichen wird mit denselben Tagen des Vormonats.",
    "uk": "Поточний місяць. Порівняння — з тими самими днями попереднього місяця."
  },
  {
    "es": "El turno cambió mientras lo editabas. Actualizá la agenda y probá de nuevo.",
    "en": "The booking changed while you were editing it. Refresh the schedule and try again.",
    "de": "Der Termin wurde während der Bearbeitung geändert. Kalender aktualisieren und erneut versuchen.",
    "uk": "Запис змінився під час редагування. Оновіть календар і спробуйте ще раз."
  },
  {
    "es": "Santi, el sábado podés a las 12? es para mi casamiento, quiero algo prolijo",
    "en": "Can I book Saturday at 12:00? It's for my wedding and I'd like something neat",
    "de": "Kann ich Samstag um 12:00 buchen? Es ist für meine Hochzeit und soll ordentlich sein",
    "uk": "Можна записатися в суботу на 12:00? Це перед весіллям, хочу акуратну стрижку"
  },
  {
    "es": "Santi, el sábado podés a las 12? es para mi casamiento, quiero algo prolijo",
    "en": "Can I book Saturday at 12:00? It's for my wedding and I'd like something neat",
    "de": "Kann ich Samstag um 12:00 buchen? Es ist für meine Hochzeit und soll ordentlich sein",
    "uk": "Можна записатися в суботу на 12:00? Це перед весіллям, хочу акуратну стрижку"
  },
  {
    "es": "Passwords are not stored in plaintext and cannot be displayed after saving.",
    "en": "Passwords are not stored in plaintext and cannot be displayed after saving.",
    "de": "Passwörter werden nicht im Klartext gespeichert und können nach dem Speichern nicht angezeigt werden.",
    "uk": "Паролі не зберігаються у відкритому вигляді, тому після збереження їх неможливо переглянути."
  },
  {
    "es": "Write as a client. This tests real availability without saving any changes.",
    "en": "Write as a client. This tests real availability without saving any changes.",
    "de": "Schreibe als Kunde. Es wird die tatsächliche Verfügbarkeit geprüft, ohne Änderungen zu speichern.",
    "uk": "Напишіть як клієнт. Система перевірить реальну доступність без збереження змін."
  },
  {
    "es": "Passkey saved. Use Face ID, Touch ID or your device screen lock at sign-in.",
    "en": "Passkey saved. Use Face ID, Touch ID or your device screen lock at sign-in.",
    "de": "Passkey gespeichert. Nutze beim Anmelden Face ID, Touch ID oder die Gerätesperre.",
    "uk": "Ключ збережено. Під час входу використовуйте Face ID, Touch ID або блокування пристрою."
  },
  {
    "es": "Para el que cae sin turno. Queda registrado igual que si hubiera reservado.",
    "en": "For walk-ins. It is recorded exactly like a regular booking.",
    "de": "Für Laufkundschaft. Wird wie ein normaler Termin erfasst.",
    "uk": "Для клієнтів без запису. Фіксується так само, як звичайний запис."
  },
  {
    "es": "Buenas! tenés turno para ${relDay(tomorrowOpen)} a la tarde? corte y barba",
    "en": "Hi! Do you have an appointment ${relDay(tomorrowOpen)} afternoon for hair and beard?",
    "de": "Hallo! Gibt es ${relDay(tomorrowOpen)} Nachmittag einen Termin für Haare und Bart?",
    "uk": "Привіт! Є вільний запис ${relDay(tomorrowOpen)} після обіду на стрижку й бороду?"
  },
  {
    "es": "¡Sí! Aceptamos efectivo, transferencia, Mercado Pago y débito o crédito. 🙌",
    "en": "Yes! We accept cash, transfer, Mercado Pago, debit and credit cards. 🙌",
    "de": "Ja! Wir akzeptieren Bargeld, Überweisung, Mercado Pago, Debit- und Kreditkarten. 🙌",
    "uk": "Так! Приймаємо готівку, переказ, Mercado Pago, дебетові та кредитні картки. 🙌"
  },
  {
    "es": " min that day. Elegí otra hora abajo, o probá con otro staff member o día.",
    "en": " min that day. Choose another time below, another staff member or another day.",
    "de": " Min. an diesem Tag. Andere Uhrzeit, anderen Mitarbeiter oder anderen Tag wählen.",
    "uk": " хв цього дня. Оберіть інший час, іншого майстра або інший день."
  },
  {
    "es": "¡Sí! Aceptamos efectivo, transferencia, Mercado Pago y débito o crédito. 🙌",
    "en": "Yes! We accept cash, transfer, Mercado Pago, debit and credit cards. 🙌",
    "de": "Ja! Wir akzeptieren Bargeld, Überweisung, Mercado Pago, Debit- und Kreditkarten. 🙌",
    "uk": "Так! Приймаємо готівку, переказ, Mercado Pago, дебетові та кредитні картки. 🙌"
  },
  {
    "es": "Mueve un turno del cliente a otra fecha y hora (mismo servicio y barbero).",
    "en": "Moves a client booking to another date and time (same service and staff member).",
    "de": "Verschiebt einen Kundentermin auf ein anderes Datum und eine andere Uhrzeit (gleiche Leistung und gleicher Mitarbeiter).",
    "uk": "Переносить запис клієнта на іншу дату й час (та сама послуга й майстер)."
  },
  {
    "es": "Pasaron más de 24 h: WhatsApp sólo permite mandar una plantilla aprobada.",
    "en": "More than 24 hours have passed: WhatsApp only allows an approved template message.",
    "de": "Mehr als 24 Stunden sind vergangen: WhatsApp erlaubt nur eine genehmigte Vorlagen-Nachricht.",
    "uk": "Минуло понад 24 години: WhatsApp дозволяє лише затверджене шаблонне повідомлення."
  },
  {
    "es": "¡Gracias crack! 🙌 Cuando quieras repetir, escribinos y te buscamos turno.",
    "en": "Thanks! 🙌 Whenever you want to come again, message us and we'll find a time.",
    "de": "Danke! 🙌 Wenn du wiederkommen möchtest, schreib uns und wir finden einen Termin.",
    "uk": "Дякуємо! 🙌 Коли захочете знову — напишіть, і ми знайдемо час."
  },
  {
    "es": "¡Gracias crack! 🙌 Cuando quieras repetir, escribinos y te buscamos turno.",
    "en": "Thanks! 🙌 Whenever you want to come again, message us and we'll find a time.",
    "de": "Danke! 🙌 Wenn du wiederkommen möchtest, schreib uns und wir finden einen Termin.",
    "uk": "Дякуємо! 🙌 Коли захочете знову — напишіть, і ми знайдемо час."
  },
  {
    "es": "Set professional ranks and specify which services each level can provide.",
    "en": "Set professional ranks and specify which services each level can provide.",
    "de": "Lege Qualifikationsstufen fest und bestimme, welche Leistungen jede Stufe anbieten darf.",
    "uk": "Налаштуйте професійні рівні та послуги, доступні для кожного рівня."
  },
  {
    "es": "Tiene que ser una cuenta profesional vinculada a una página de Facebook.",
    "en": "It must be a professional account linked to a Facebook page.",
    "de": "Es muss ein professionelles Konto sein, das mit einer Facebook-Seite verknüpft ist.",
    "uk": "Це має бути професійний акаунт, пов’язаний зі сторінкою Facebook."
  },
  {
    "es": "No quedan horarios that day. Probá con otro día o con otro staff member.",
    "en": "No slots are available that day. Try another day or another staff member.",
    "de": "An diesem Tag sind keine Zeiten frei. Anderen Tag oder Mitarbeiter wählen.",
    "uk": "На цей день немає вільного часу. Спробуйте інший день або іншого майстра."
  },
  {
    "es": "Si ya terminó, cobralo o marcalo como terminado para liberar el horario.",
    "en": "If it has already ended, charge it or mark it completed to free the time slot.",
    "de": "Wenn der Termin bereits beendet ist, rechne ihn ab oder markiere ihn als abgeschlossen, um den Zeitraum freizugeben.",
    "uk": "Якщо запис уже завершився, розрахуйте його або позначте завершеним, щоб звільнити час."
  },
  {
    "es": "Se aplicó el 50% de la tarjeta de fidelidad. Arranca una tarjeta nueva.",
    "en": "The 50% loyalty reward was applied. A new loyalty cycle starts.",
    "de": "Die 50-%-Treueprämie wurde angewendet. Ein neuer Treuezyklus beginnt.",
    "uk": "Знижку 50% за лояльність застосовано. Починається новий цикл."
  },
  {
    "es": "Hola! quería sacar turno para mi hijo de 8 años, el sábado a la mañana",
    "en": "Hi! I'd like to book my 8-year-old son for Saturday morning",
    "de": "Hallo! Ich möchte für meinen 8-jährigen Sohn am Samstagmorgen einen Termin buchen",
    "uk": "Привіт! Хочу записати 8-річного сина на суботу вранці"
  },
  {
    "es": "Hola! quería sacar turno para mi hijo de 8 años, el sábado a la mañana",
    "en": "Hi! I'd like to book my 8-year-old son for Saturday morning",
    "de": "Hallo! Ich möchte für meinen 8-jährigen Sohn am Samstagmorgen einen Termin buchen",
    "uk": "Привіт! Хочу записати 8-річного сина на суботу вранці"
  },
  {
    "es": "Lista los próximos turnos del cliente de esta conversación, con su id.",
    "en": "Lists upcoming bookings for the client in this conversation, including their IDs.",
    "de": "Listet kommende Termine des Kunden in dieser Unterhaltung inklusive IDs.",
    "uk": "Показує майбутні записи клієнта в цій розмові разом з ID."
  },
  {
    "es": "Puede tardar unos minutos. Si no te llega la confirmación, escribinos.",
    "en": "It may take a few minutes. If confirmation does not arrive, contact us.",
    "de": "Es kann einige Minuten dauern. Wenn keine Bestätigung kommt, kontaktiere uns.",
    "uk": "Це може зайняти кілька хвилин. Якщо підтвердження не надійде, напишіть нам."
  },
  {
    "es": "de lo atendido con turno, sin que nadie del equipo agarre el celular.",
    "en": "of booked revenue without the team having to handle the phone.",
    "de": "des Terminumsatzes, ohne dass das Team das Telefon bedienen musste.",
    "uk": "доходу від записів без участі команди в телефоні."
  },
  {
    "es": "Agente actualizado. Los próximos mensajes ya usan esta configuración.",
    "en": "AI Agent updated. New messages use this configuration.",
    "de": "KI-Assistent aktualisiert. Neue Nachrichten verwenden diese Einstellungen.",
    "uk": "AI-асистента оновлено. Нові повідомлення використовують ці налаштування."
  },
  {
    "es": "Hola Matías. Mañana hay lugar a las 18:00 con Nehemías. ¿Lo reservo?",
    "en": "Hello. There is availability tomorrow at 18:00. Shall I book it?",
    "de": "Hallo. Morgen ist um 18:00 ein Termin frei. Soll ich ihn buchen?",
    "uk": "Добрий день. Завтра є вільний час о 18:00. Записати вас?"
  },
  {
    "es": "Aceptamos efectivo, transferencia, Mercado Pago y débito o crédito.",
    "en": "We accept cash, bank transfer, Mercado Pago, debit and credit cards.",
    "de": "Wir akzeptieren Bargeld, Überweisung, Mercado Pago, Debit- und Kreditkarten.",
    "uk": "Приймаємо готівку, переказ, Mercado Pago, дебетові та кредитні картки."
  },
  {
    "es": "antes de ahora para registrar este corte. Indicá a qué hora fue, en",
    "en": "before now to record this service. Enter when it happened under",
    "de": "vor jetzt, um diese Leistung zu erfassen. Gib die Uhrzeit an unter",
    "uk": "до поточного часу для фіксації цієї послуги. Вкажіть час у полі"
  },
  {
    "es": "Por Instagram, pedí nombre y teléfono antes de confirmar un turno.",
    "en": "On Instagram, ask for name and phone before confirming a booking.",
    "de": "Auf Instagram vor der Terminbestätigung nach Name und Telefon fragen.",
    "uk": "В Instagram перед підтвердженням запису запитайте ім’я та телефон."
  },
  {
    "es": "Por Instagram, pedí nombre y teléfono antes de confirmar un turno.",
    "en": "On Instagram, ask for name and phone before confirming a booking.",
    "de": "Auf Instagram vor der Terminbestätigung nach Name und Telefon fragen.",
    "uk": "В Instagram перед підтвердженням запису запитайте ім’я та телефон."
  },
  {
    "es": "en el entorno del servidor. Sin ella el agente no puede responder.",
    "en": "is missing from the server environment. The AI Agent cannot reply without it.",
    "de": "fehlt in der Serverumgebung. Ohne diesen Schlüssel kann der KI-Assistent nicht antworten.",
    "uk": "відсутній у середовищі сервера. Без цього ключа AI-асистент не може відповідати."
  },
  {
    "es": "Habituales que hace más de 5 semanas no vienen y no tienen turno.",
    "en": "Regular clients who have not visited for more than 5 weeks and have no booking.",
    "de": "Stammkunden, die seit mehr als 5 Wochen nicht da waren und keinen Termin haben.",
    "uk": "Постійні клієнти, які не були понад 5 тижнів і не мають запису."
  },
  {
    "es": "Buenas crack! Mañana 18hs con Nehemías te queda joya, ¿lo agarro?",
    "en": "Hey! Tomorrow at 18:00 is available. Want me to book it?",
    "de": "Hey! Morgen um 18:00 ist frei. Soll ich buchen?",
    "uk": "Привіт! Завтра о 18:00 вільно. Записати?"
  },
  {
    "es": "No se pudo generar el link de pago. Probá de nuevo en un minuto.",
    "en": "Could not create the payment link. Try again in a minute.",
    "de": "Zahlungslink konnte nicht erstellt werden. Versuche es in einer Minute erneut.",
    "uk": "Не вдалося створити посилання на оплату. Спробуйте ще раз за хвилину."
  },
  {
    "es": "Recibimos tu seña. Ya podés cerrar esta ventana — te esperamos.",
    "en": "We received your deposit. You can close this window — your booking is confirmed.",
    "de": "Wir haben deine Anzahlung erhalten. Du kannst dieses Fenster schließen — dein Termin ist bestätigt.",
    "uk": "Ми отримали передоплату. Можете закрити це вікно — запис підтверджено."
  },
  {
    "es": "¡Hola Mati! Mañana tengo 18:00 con Nehemías, ¿te lo reservo? 💈",
    "en": "Hi! I have 18:00 available tomorrow. Shall I book it for you?",
    "de": "Hallo! Morgen ist 18:00 frei. Soll ich den Termin buchen?",
    "uk": "Привіт! Завтра вільно о 18:00. Записати вас?"
  },
  {
    "es": "Write normal instructions. The AI Agent follows them exactly.",
    "en": "Write normal instructions. The AI Agent follows them exactly.",
    "de": "Formuliere klare Anweisungen. Der KI-Assistent berücksichtigt sie bei seiner Arbeit.",
    "uk": "Напишіть зрозумілі інструкції. AI-асистент враховуватиме їх під час роботи."
  },
  {
    "es": "Lo que sale de la caja: insumos, un arreglo, la luz, un vale.",
    "en": "Money leaving the cash: supplies, repairs, utilities or an advance.",
    "de": "Ausgaben aus der Kasse: Material, Reparatur, Nebenkosten oder Vorschuss.",
    "uk": "Витрати з каси: матеріали, ремонт, комунальні або аванс."
  },
  {
    "es": "En palabras normales. El agente las sigue al pie de la letra.",
    "en": "Write normal instructions. The AI Agent follows them exactly.",
    "de": "Formuliere klare Anweisungen. Der KI-Assistent berücksichtigt sie bei seiner Arbeit.",
    "uk": "Напишіть зрозумілі інструкції. AI-асистент враховуватиме їх під час роботи."
  },
  {
    "es": "justo tiene un turno en ese momento. Probá con otro barbero.",
    "en": "already has a booking at that time. Try another staff member.",
    "de": "hat zu dieser Zeit bereits einen Termin. Wähle einen anderen Mitarbeiter.",
    "uk": "вже має запис на цей час. Спробуйте іншого майстра."
  },
  {
    "es": "[Contexto del sistema — no es parte del mensaje del cliente]",
    "en": "[System context — not part of the client message]",
    "de": "[Systemkontext — nicht Teil der Kundennachricht]",
    "uk": "[Системний контекст — не є частиною повідомлення клієнта]"
  },
  {
    "es": "Zernio returned an error. Volvé a intentar en unos minutos.",
    "en": "Zernio returned an error. Try again in a few minutes.",
    "de": "Zernio hat einen Fehler zurückgegeben. Versuche es in einigen Minuten erneut.",
    "uk": "Zernio повернув помилку. Спробуйте ще раз за кілька хвилин."
  },
  {
    "es": "Pendiente: definir con Booking si cobran seña al reservar.",
    "en": "Pending: configure whether a deposit is required for booking.",
    "de": "Ausstehend: festlegen, ob bei der Buchung eine Anzahlung erforderlich ist.",
    "uk": "Очікує налаштування: чи потрібна передоплата під час запису."
  },
  {
    "es": "Ese horario ya lo ocupa otro turno: no se puede reactivar.",
    "en": "That time is already occupied by another booking and cannot be reactivated.",
    "de": "Diese Zeit ist bereits durch einen anderen Termin belegt und kann nicht reaktiviert werden.",
    "uk": "Цей час уже зайнятий іншим записом, його не можна відновити."
  },
  {
    "es": "Este turno ya fue cobrado; no se puede cambiar el barbero.",
    "en": "This booking has already been paid; the staff member cannot be changed.",
    "de": "Dieser Termin wurde bereits bezahlt; der Mitarbeiter kann nicht geändert werden.",
    "uk": "Цей запис уже оплачено; майстра змінити не можна."
  },
  {
    "es": "pero ninguna plata anotada (esos cortes no se importaron).",
    "en": "but no amount recorded (those services were not imported).",
    "de": "aber keinen erfassten Betrag (diese Leistungen wurden nicht importiert).",
    "uk": "але немає вказаної суми (ці послуги не імпортовано)."
  },
  {
    "es": "Products, purchases, sales, stock receipts and write-offs.",
    "en": "Products, purchases, sales, stock receipts and write-offs.",
    "de": "Produkte, Einkäufe, Verkäufe, Wareneingänge und Abschreibungen.",
    "uk": "Товари, закупівлі, продажі, надходження та списання."
  },
  {
    "es": "Disable online deposits before changing currency from ARS.",
    "en": "Disable online deposits before changing currency from ARS.",
    "de": "Deaktiviere Online-Anzahlungen, bevor du die Währung von ARS änderst.",
    "uk": "Вимкніть онлайн-передоплату, перш ніж змінювати ARS на іншу валюту."
  },
  {
    "es": "Pendiente: definir con Booking si cobran seña al reservar.",
    "en": "Pending: configure whether a deposit is required for booking.",
    "de": "Ausstehend: festlegen, ob bei der Buchung eine Anzahlung erforderlich ist.",
    "uk": "Очікує налаштування: чи потрібна передоплата під час запису."
  },
  {
    "es": "Tomaste la conversación. El agente no va a responder acá.",
    "en": "You took over the conversation. The AI Agent will not reply here.",
    "de": "Du hast die Unterhaltung übernommen. Der KI-Assistent antwortet hier nicht.",
    "uk": "Ви взяли розмову на себе. AI-асистент тут не відповідатиме."
  },
  {
    "es": "La hora de salida tiene que ser después de la de entrada.",
    "en": "End time must be after start time.",
    "de": "Die Endzeit muss nach der Startzeit liegen.",
    "uk": "Час завершення має бути після початку."
  },
  {
    "es": "Registration complete. Sign in with your new credentials.",
    "en": "Registration complete. Sign in with your new credentials.",
    "de": "Registrierung abgeschlossen. Melde dich mit deinen neuen Zugangsdaten an.",
    "uk": "Реєстрацію завершено. Увійдіть із новими даними."
  },
  {
    "es": "Se anota terminando ahora, en el hueco libre del barbero.",
    "en": "It is recorded as ending now in the staff member's free slot.",
    "de": "Wird als jetzt beendet im freien Zeitraum des Mitarbeiters erfasst.",
    "uk": "Фіксується як завершений зараз у вільному проміжку майстра."
  },
  {
    "es": "Avisale a quien te mandó el link y lo intentan de nuevo.",
    "en": "Tell the person who sent you the link and try again.",
    "de": "Informiere die Person, die dir den Link geschickt hat, und versuche es erneut.",
    "uk": "Повідомте людину, яка надіслала посилання, і спробуйте ще раз."
  },
  {
    "es": "Pregunta por platinado: no está en la lista de servicios",
    "en": "Asked about a service that is not in the service list",
    "de": "Frage zu einer Leistung, die nicht in der Liste steht",
    "uk": "Питання про послугу, якої немає у списку"
  },
  {
    "es": "Nunca inventes descuentos ni promociones que no existen.",
    "en": "Never invent discounts or promotions that do not exist.",
    "de": "Erfinde niemals Rabatte oder Aktionen, die es nicht gibt.",
    "uk": "Ніколи не вигадуй знижки чи акції, яких не існує."
  },
  {
    "es": "Pregunta por platinado: no está en la lista de servicios",
    "en": "Asked about a service that is not in the service list",
    "de": "Frage zu einer Leistung, die nicht in der Liste steht",
    "uk": "Питання про послугу, якої немає у списку"
  },
  {
    "es": "Nunca inventes descuentos ni promociones que no existen.",
    "en": "Never invent discounts or promotions that do not exist.",
    "de": "Erfinde niemals Rabatte oder Aktionen, die es nicht gibt.",
    "uk": "Ніколи не вигадуй знижки чи акції, яких не існує."
  },
  {
    "es": "Could not reach Zernio. Revisá la conexión del servidor.",
    "en": "Could not reach Zernio. Check the server connection.",
    "de": "Zernio ist nicht erreichbar. Prüfe die Serververbindung.",
    "uk": "Не вдалося підключитися до Zernio. Перевірте з’єднання сервера."
  },
  {
    "es": "A cancelled or missed appointment cannot be checked in.",
    "en": "A cancelled or missed appointment cannot be checked in.",
    "de": "Ein stornierter oder versäumter Termin kann nicht als erschienen markiert werden.",
    "uk": "Не можна відмітити прихід для скасованого чи пропущеного запису."
  },
  {
    "es": "Revisá el teléfono: tiene que tener al menos 8 números.",
    "en": "Check the phone number: it needs at least 8 digits.",
    "de": "Telefonnummer prüfen: mindestens 8 Ziffern.",
    "uk": "Перевірте номер телефону: щонайменше 8 цифр."
  },
  {
    "es": "No se pudo copiar: seleccioná el link y copialo a mano.",
    "en": "Could not copy automatically. Select the link and copy it manually.",
    "de": "Automatisches Kopieren fehlgeschlagen. Link markieren und manuell kopieren.",
    "uk": "Не вдалося скопіювати автоматично. Виділіть посилання та скопіюйте вручну."
  },
  {
    "es": "Escribile como si fueras un cliente. Agenda en la demo.",
    "en": "Write as if you were a client. It uses the demo schedule.",
    "de": "Schreibe wie ein Kunde. Es wird der Demo-Kalender verwendet.",
    "uk": "Пишіть як клієнт. Використовується демо-календар."
  },
  {
    "es": "Elegí otra hora abajo, o probá con otro barbero o día.",
    "en": "Select another time below, or choose another barber or day.",
    "de": "Wähle unten eine andere Uhrzeit, einen anderen Barbier oder Tag.",
    "uk": "Виберіть інший час нижче або іншого барбера чи день."
  },
  {
    "es": "Contá el efectivo del cajón y cargalo. Queda guardado.",
    "en": "Count the cash in the drawer and enter it. It will be saved.",
    "de": "Bargeld in der Kasse zählen und eintragen. Es wird gespeichert.",
    "uk": "Порахуйте готівку в касі та внесіть суму. Вона буде збережена."
  },
  {
    "es": "En esos días el agente y la reserva web no lo ofrecen.",
    "en": "On those days the AI Agent and online booking do not offer this staff member.",
    "de": "An diesen Tagen wird der Mitarbeiter von KI und Online-Buchung nicht angeboten.",
    "uk": "У ці дні AI-асистент та онлайн-запис не пропонують цього майстра."
  },
  {
    "es": "No hay otro barbero libre y trabajando en esta franja.",
    "en": "No other staff member is available in this time range.",
    "de": "In diesem Zeitraum ist kein anderer Mitarbeiter verfügbar.",
    "uk": "У цей проміжок немає іншого вільного майстра."
  },
  {
    "es": "La hora de fin tiene que ser después de la de inicio.",
    "en": "End time must be after start time.",
    "de": "Die Endzeit muss nach der Startzeit liegen.",
    "uk": "Час завершення має бути після початку."
  },
  {
    "es": "ya tiene un turno en ese horario. Indicá otra hora en",
    "en": "already has a booking at that time. Enter another time under",
    "de": "hat zu dieser Zeit bereits einen Termin. Gib eine andere Zeit an unter",
    "uk": "вже має запис у цей час. Вкажіть інший час у полі"
  },
  {
    "es": "The invite is no longer valid for an active employee.",
    "en": "The invite is no longer valid for an active employee.",
    "de": "Die Einladung gilt nicht mehr für einen aktiven Mitarbeiter.",
    "uk": "Запрошення більше не дійсне для активного працівника."
  },
  {
    "es": "El agente y la reserva web lo usan apenas lo guardás.",
    "en": "The AI Agent and online booking use it as soon as you save it.",
    "de": "KI-Assistent und Online-Buchung verwenden es sofort nach dem Speichern.",
    "uk": "AI-асистент і онлайн-запис використовують це одразу після збереження."
  },
  {
    "es": "Arranca con el horario del local; después lo ajustás.",
    "en": "Starts with the business hours; you can adjust it afterwards.",
    "de": "Beginnt mit den Öffnungszeiten und kann danach angepasst werden.",
    "uk": "Спочатку використовується графік закладу, потім його можна змінити."
  },
  {
    "es": "Atiende (si lo apagás, deja de aparecer para agendar)",
    "en": "Available for bookings",
    "de": "Für Buchungen verfügbar",
    "uk": "Доступний для запису"
  },
  {
    "es": "Si el barbero está con alguien, queda a continuación.",
    "en": "If the staff member is busy, this booking starts next.",
    "de": "Wenn der Mitarbeiter beschäftigt ist, beginnt dieser Termin danach.",
    "uk": "Якщо майстер зайнятий, цей запис буде наступним."
  },
  {
    "es": "Hola! hacen platinado? tengo el pelo bastante oscuro",
    "en": "Hi! Do you offer platinum coloring? My hair is quite dark",
    "de": "Hallo! Bietet ihr Platinfärbung an? Meine Haare sind ziemlich dunkel",
    "uk": "Привіт! Робите платинове фарбування? У мене доволі темне волосся"
  },
  {
    "es": "Hola! hacen platinado? tengo el pelo bastante oscuro",
    "en": "Hi! Do you offer platinum coloring? My hair is quite dark",
    "de": "Hallo! Bietet ihr Platinfärbung an? Meine Haare sind ziemlich dunkel",
    "uk": "Привіт! Робите платинове фарбування? У мене доволі темне волосся"
  },
  {
    "es": "la misma regla de la tarjeta física que ya entregan.",
    "en": "the configured loyalty rule.",
    "de": "die konfigurierte Treueregel.",
    "uk": "налаштоване правило лояльності."
  },
  {
    "es": "Podés sacar booking directo desde acá: /reservar ✂️",
    "en": "You can book directly here: /reservar ✂️",
    "de": "Du kannst direkt hier buchen: /reservar ✂️",
    "uk": "Можете записатися напряму тут: /reservar ✂️"
  },
  {
    "es": "Teléfono del cliente, o cadena vacía si no se sabe.",
    "en": "Client phone number, or an empty string if unknown.",
    "de": "Telefonnummer des Kunden oder leer, wenn unbekannt.",
    "uk": "Номер телефону клієнта або порожнє значення, якщо невідомо."
  },
  {
    "es": "Sólo se puede pasar un turno que todavía no empezó.",
    "en": "Only a booking that has not started can be moved.",
    "de": "Nur ein noch nicht begonnener Termin kann verschoben werden.",
    "uk": "Можна переносити лише запис, який ще не почався."
  },
  {
    "es": "That time was just taken. Check availability again.",
    "en": "That time was just taken. Check availability again.",
    "de": "Dieser Termin wurde gerade belegt. Verfügbarkeit erneut prüfen.",
    "uk": "Цей час щойно зайняли. Перевірте доступність ще раз."
  },
  {
    "es": "Hubo movimientos después del cierre: hoy se esperan",
    "en": "There were transactions after closing: expected today",
    "de": "Nach dem Abschluss gab es Buchungen: heute erwartet",
    "uk": "Після закриття були операції: сьогодні очікується"
  },
  {
    "es": "Ese horario deja de ofrecerse a los demás clientes.",
    "en": "That time is no longer offered to other clients.",
    "de": "Diese Zeit wird anderen Kunden nicht mehr angeboten.",
    "uk": "Цей час більше не пропонується іншим клієнтам."
  },
  {
    "es": "Podés sacar turno directo desde acá: /reservar ✂️",
    "en": "You can book directly here: /reservar ✂️",
    "de": "Du kannst direkt hier buchen: /reservar ✂️",
    "uk": "Можете записатися напряму тут: /reservar ✂️"
  },
  {
    "es": "acaba de ocupar ese horario. Elegí otro barbero.",
    "en": "just took that time. Choose another staff member.",
    "de": "hat diesen Zeitraum gerade belegt. Wähle einen anderen Mitarbeiter.",
    "uk": "щойно зайняв цей час. Оберіть іншого майстра."
  },
  {
    "es": "Enter the one-time invite key from your manager.",
    "en": "Enter the one-time invite key from your manager.",
    "de": "Gib den einmaligen Einladungscode deiner Leitung ein.",
    "uk": "Введіть одноразовий ключ-запрошення від керівника."
  },
  {
    "es": "This invite is invalid, expired or already used.",
    "en": "This invite is invalid, expired or already used.",
    "de": "Diese Einladung ist ungültig, abgelaufen oder bereits verwendet.",
    "uk": "Запрошення недійсне, прострочене або вже використане."
  },
  {
    "es": "La comisión se usa en la liquidación de la caja.",
    "en": "Commission is used in staff settlement.",
    "de": "Die Provision wird für die Mitarbeiterabrechnung verwendet.",
    "uk": "Комісія використовується для розрахунку з майстром."
  },
  {
    "es": "No se puede cerrar un día que todavía no llegó.",
    "en": "A future day cannot be closed.",
    "de": "Ein zukünftiger Tag kann nicht abgeschlossen werden.",
    "uk": "Не можна закрити день, який ще не настав."
  },
  {
    "es": "Degradé bajo, 1,5 a los costados, tijera arriba",
    "en": "Low fade, 1.5 on the sides, scissors on top",
    "de": "Low Fade, 1,5 an den Seiten, oben Schere",
    "uk": "Низький фейд, 1,5 з боків, зверху ножицями"
  },
  {
    "es": "Degradé bajo, 1,5 a los costados, tijera arriba",
    "en": "Low fade, 1.5 on the sides, scissors on top",
    "de": "Low Fade, 1,5 an den Seiten, oben Schere",
    "uk": "Низький фейд, 1,5 з боків, зверху ножицями"
  },
  {
    "es": "Conectada: todo lo que se carga queda guardado.",
    "en": "Connected: all data is saved permanently.",
    "de": "Verbunden: Alle Daten werden dauerhaft gespeichert.",
    "uk": "Підключено: усі дані зберігаються постійно."
  },
  {
    "es": "Cliente, servicio, barbero y horario. Nada más.",
    "en": "Client, service, staff member and time. That's it.",
    "de": "Kunde, Leistung, Mitarbeiter und Uhrzeit. Mehr nicht.",
    "uk": "Клієнт, послуга, майстер і час. Нічого зайвого."
  },
  {
    "es": "Sólo en horarios que la agenda confirma libres.",
    "en": "Only times confirmed free by the schedule.",
    "de": "Nur Zeiten, die im Kalender als frei bestätigt sind.",
    "uk": "Лише час, який календар підтверджує як вільний."
  },
  {
    "es": "che hoy no llego a las 17, se puede más tarde?",
    "en": "Hi, I can't make 17:00 today. Is later possible?",
    "de": "Hallo, ich schaffe es heute nicht um 17:00. Geht es später?",
    "uk": "Привіт, сьогодні не встигаю на 17:00. Можна пізніше?"
  },
  {
    "es": "Tu próximo corte sale al 50%. ¿Te busco turno?",
    "en": "Your next service is 50% off. Shall I find a time for you?",
    "de": "Deine nächste Leistung ist 50 % günstiger. Soll ich einen Termin suchen?",
    "uk": "Наступна послуга зі знижкою 50%. Підібрати час?"
  },
  {
    "es": "che hoy no llego a las 17, se puede más tarde?",
    "en": "Hi, I can't make 17:00 today. Is later possible?",
    "de": "Hallo, ich schaffe es heute nicht um 17:00. Geht es später?",
    "uk": "Привіт, сьогодні не встигаю на 17:00. Можна пізніше?"
  },
  {
    "es": "Cobrar seña al reservar por la web o el agente",
    "en": "Require a deposit for web or AI bookings",
    "de": "Anzahlung bei Web- oder KI-Buchung verlangen",
    "uk": "Вимагати передоплату для веб- або AI-записів"
  },
  {
    "es": "Cero a los costados, barba perfilada a navaja",
    "en": "Zero on the sides, beard shaped with a razor",
    "de": "Seiten auf Null, Bart mit Rasiermesser konturiert",
    "uk": "З боків під нуль, борода окантована бритвою"
  },
  {
    "es": "This appointment slot is no longer available.",
    "en": "This appointment slot is no longer available.",
    "de": "Dieser Termin ist nicht mehr verfügbar.",
    "uk": "Цей час уже недоступний."
  },
  {
    "es": "Nota (opcional): ej. faltan $1.000 del cambio",
    "en": "Optional note: e.g. the cash drawer is short by 1,000",
    "de": "Optionale Notiz: z. B. fehlen 1.000 in der Kasse",
    "uk": "Примітка (необов'язково): наприклад, у касі не вистачає 1 000"
  },
  {
    "es": "Use the credentials provided by your manager.",
    "en": "Use the credentials provided by your manager.",
    "de": "Melde dich mit den Zugangsdaten deiner Leitung an.",
    "uk": "Увійдіть за даними, які надав керівник."
  },
  {
    "es": "Revenue, expenses and cash movements by date.",
    "en": "Revenue, expenses and cash movements by date.",
    "de": "Umsätze, Ausgaben und Kassenbewegungen nach Datum.",
    "uk": "Виручка, витрати та рух коштів за датами."
  },
  {
    "es": "Use at least 12 characters for your password.",
    "en": "Use at least 12 characters for your password.",
    "de": "Verwende mindestens 12 Zeichen für dein Passwort.",
    "uk": "Пароль має містити щонайменше 12 символів."
  },
  {
    "es": "Promedio facturado por día abierto en el mes.",
    "en": "Average revenue per open day this month.",
    "de": "Durchschnittlicher Umsatz pro Öffnungstag im Monat.",
    "uk": "Середній дохід за робочий день місяця."
  },
  {
    "es": "Hoy se reserva sin pagar nada por adelantado.",
    "en": "Bookings currently require no advance payment.",
    "de": "Aktuell ist keine Vorauszahlung erforderlich.",
    "uk": "Зараз запис можливий без передоплати."
  },
  {
    "es": "La salida tiene que ser después de la entrada",
    "en": "End time must be after start time",
    "de": "Ende muss nach dem Beginn liegen",
    "uk": "Час завершення має бути після початку"
  },
  {
    "es": "por delante. Movelos antes de darlo de baja.",
    "en": "upcoming. Move them before deactivating this staff member.",
    "de": "bevorstehend. Verschiebe sie vor der Deaktivierung.",
    "uk": "майбутніх. Перенесіть їх перед деактивацією майстра."
  },
  {
    "es": "Te escribo una hora antes para recordártelo.",
    "en": "I'll message you an hour before as a reminder.",
    "de": "Ich schreibe dir eine Stunde vorher zur Erinnerung.",
    "uk": "Я напишу за годину до запису, щоб нагадати."
  },
  {
    "es": "MERCADOPAGO_WEBHOOK_SECRET parece incompleto",
    "en": "MERCADOPAGO_WEBHOOK_SECRET looks incomplete",
    "de": "MERCADOPAGO_WEBHOOK_SECRET scheint unvollständig",
    "uk": "MERCADOPAGO_WEBHOOK_SECRET виглядає неповним"
  },
  {
    "es": "tarjeta completa, el próximo corte va al 50%",
    "en": "loyalty card complete, the next service is 50% off",
    "de": "Treuekarte vollständig, die nächste Leistung ist 50 % günstiger",
    "uk": "картку лояльності заповнено, наступна послуга зі знижкою 50%"
  },
  {
    "es": "was loaded without an assigned staff member.",
    "en": "was loaded without an assigned staff member.",
    "de": "wurde ohne zugewiesenen Mitarbeiter geladen.",
    "uk": "завантажено без призначеного майстра."
  },
  {
    "es": "Connected. Your data is saved in PostgreSQL.",
    "en": "Connected. Your data is saved in PostgreSQL.",
    "de": "Verbunden. Deine Daten werden in PostgreSQL gespeichert.",
    "uk": "Підключено. Ваші дані зберігаються в PostgreSQL."
  },
  {
    "es": "Passkeys are not configured for this domain.",
    "en": "Passkeys are not configured for this domain.",
    "de": "Passkeys sind für diese Domain nicht eingerichtet.",
    "uk": "Ключі доступу не налаштовані для цього домену."
  },
  {
    "es": "El final tiene que ser después del comienzo.",
    "en": "End time must be after start time.",
    "de": "Die Endzeit muss nach der Startzeit liegen.",
    "uk": "Час завершення має бути після початку."
  },
  {
    "es": "Atendemos de martes a sábado de 11 a 20 hs.",
    "en": "We are open Tuesday to Saturday, 11:00–20:00.",
    "de": "Wir haben Dienstag bis Samstag von 11:00 bis 20:00 Uhr geöffnet.",
    "uk": "Ми працюємо з вівторка по суботу з 11:00 до 20:00."
  },
  {
    "es": "Ese turno queda fuera del horario del local",
    "en": "That booking falls outside business hours",
    "de": "Dieser Termin liegt außerhalb der Öffnungszeiten",
    "uk": "Цей запис виходить за межі робочого часу"
  },
  {
    "es": "¿Quién es? (opcional, sólo lo ve el equipo)",
    "en": "Who is it? (optional, team only)",
    "de": "Wer ist es? (optional, nur Team)",
    "uk": "Хто це? (необов’язково, лише для команди)"
  },
  {
    "es": "Escribir acá pausa al agente en este chat…",
    "en": "Typing here pauses the AI Agent in this chat…",
    "de": "Eine Nachricht hier pausiert den KI-Assistenten in diesem Chat…",
    "uk": "Повідомлення тут призупинить AI-асистента в цьому чаті…"
  },
  {
    "es": "pago aprobado de un turno que ya no existe",
    "en": "approved payment for a booking that no longer exists",
    "de": "bestätigte Zahlung für einen nicht mehr vorhandenen Termin",
    "uk": "підтверджена оплата для запису, якого вже не існує"
  },
  {
    "es": "Reclamo por corte desparejo (ver Bandeja).",
    "en": "Complaint about an uneven cut (see Inbox).",
    "de": "Beschwerde über ungleichmäßigen Schnitt (siehe Posteingang).",
    "uk": "Скарга на нерівну стрижку (див. Вхідні)."
  },
  {
    "es": "Viene cada 2 semanas, siempre los viernes.",
    "en": "Comes every 2 weeks, always on Fridays.",
    "de": "Kommt alle 2 Wochen, immer freitags.",
    "uk": "Приходить кожні 2 тижні, завжди у п’ятницю."
  },
  {
    "es": "Reclamo por corte desparejo (ver Bandeja).",
    "en": "Complaint about an uneven haircut (see Inbox).",
    "de": "Beschwerde wegen ungleichmäßigem Haarschnitt (siehe Posteingang).",
    "uk": "Скарга на нерівну стрижку (див. Вхідні)."
  },
  {
    "es": "Coincide con un franco o un turno fijo de ",
    "en": "It overlaps with time off or a fixed booking for ",
    "de": "Überschneidet sich mit Abwesenheit oder Fixtermin von ",
    "uk": "Перетинається з відсутністю або постійним записом у "
  },
  {
    "es": "Revisá la duración: entre 5 y 240 minutos.",
    "en": "Check the duration: 5 to 240 minutes.",
    "de": "Dauer prüfen: 5 bis 240 Minuten.",
    "uk": "Перевірте тривалість: від 5 до 240 хвилин."
  },
  {
    "es": "Reprogramado por el agente (antes 17:00).",
    "en": "Rescheduled by the AI Agent (previously 17:00).",
    "de": "Vom KI-Assistenten verschoben (zuvor 17:00).",
    "uk": "Перенесено AI-асистентом (раніше 17:00)."
  },
  {
    "es": "Choose a valid period of at most 3 years.",
    "en": "Choose a valid period of at most 3 years.",
    "de": "Wähle einen gültigen Zeitraum von höchstens 3 Jahren.",
    "uk": "Виберіть правильний період до 3 років."
  },
  {
    "es": "Se habría agendado (ensayo: no se guardó)",
    "en": "Would have been booked (test: not saved)",
    "de": "Wäre gebucht worden (Test: nicht gespeichert)",
    "uk": "Було б записано (тест: не збережено)"
  },
  {
    "es": "en ese horario. Movelos desde la agenda.",
    "en": "in that time range. Move them from the schedule.",
    "de": "in diesem Zeitraum. Verschiebe sie im Kalender.",
    "uk": "у цьому проміжку. Перенесіть їх у календарі."
  },
  {
    "es": "ZERNIO_WEBHOOK_SECRET es demasiado corto",
    "en": "ZERNIO_WEBHOOK_SECRET is too short",
    "de": "ZERNIO_WEBHOOK_SECRET ist zu kurz",
    "uk": "ZERNIO_WEBHOOK_SECRET надто короткий"
  },
  {
    "es": "Buscar por nombre, teléfono o @instagram",
    "en": "Search by name, phone or @instagram",
    "de": "Nach Name, Telefon oder @instagram suchen",
    "uk": "Пошук за ім’ям, телефоном або @instagram"
  },
  {
    "es": "Rank, commission & login · Edit employee",
    "en": "Rank, commission & login · Edit employee",
    "de": "Rang, Provision und Zugang · Mitarbeiter bearbeiten",
    "uk": "Ранг, відсоток і доступ · Редагування співробітника"
  },
  {
    "es": "El fin tiene que ser después del inicio.",
    "en": "End time must be after start time.",
    "de": "Die Endzeit muss nach der Startzeit liegen.",
    "uk": "Час завершення має бути після початку."
  },
  {
    "es": "me quiero cortar el sábado con Sebastián",
    "en": "I want an appointment on Saturday",
    "de": "Ich möchte am Samstag einen Termin",
    "uk": "Хочу записатися на суботу"
  },
  {
    "es": "Productos para reventa (ceras, pomadas)",
    "en": "Products for resale (waxes, pomades)",
    "de": "Produkte für den Weiterverkauf (Wachs, Pomade)",
    "uk": "Товари для перепродажу (віск, помада)"
  },
  {
    "es": "tengo lugar desde las 11:00. ¿Te sirve?",
    "en": "I have availability from 11:00. Does that work?",
    "de": "Ab 11:00 ist etwas frei. Passt das?",
    "uk": "Є вільний час з 11:00. Підходить?"
  },
  {
    "es": "no tiene libre ese horario. Elegí otro.",
    "en": "is not available at that time. Choose another.",
    "de": "ist zu dieser Zeit nicht verfügbar. Wähle eine andere Zeit.",
    "uk": "недоступний у цей час. Оберіть інший час."
  },
  {
    "es": "Alguien acaba de tomar ese horario con ",
    "en": "Someone just took that time with ",
    "de": "Dieser Termin wurde gerade bei ",
    "uk": "Цей час щойно зайняли у "
  },
  {
    "es": "La duración tiene que ser mayor a cero.",
    "en": "Duration must be greater than zero.",
    "de": "Die Dauer muss größer als null sein.",
    "uk": "Тривалість має бути більшою за нуль."
  },
  {
    "es": "Choose another day to see appointments.",
    "en": "Choose another day to see appointments.",
    "de": "Wähle einen anderen Tag, um Termine zu sehen.",
    "uk": "Виберіть інший день для перегляду записів."
  },
  {
    "es": "Para reservar hay que pagar una seña de",
    "en": "A deposit is required to book:",
    "de": "Für die Buchung ist eine Anzahlung erforderlich:",
    "uk": "Для запису потрібна передоплата:"
  },
  {
    "es": "Con la lista de Ajustes, nunca inventa.",
    "en": "Uses the configured service list and never invents prices.",
    "de": "Verwendet die konfigurierte Leistungsliste und erfindet keine Preise.",
    "uk": "Використовує налаштований список послуг і не вигадує ціни."
  },
  {
    "es": "Mismo servicio y barbero, otro horario.",
    "en": "Same service and staff member, different time.",
    "de": "Gleiche Leistung und gleicher Mitarbeiter, andere Uhrzeit.",
    "uk": "Та сама послуга й майстер, інший час."
  },
  {
    "es": "en ese lapso. Movelos desde la agenda.",
    "en": "in that period. Move them from the schedule.",
    "de": "in diesem Zeitraum. Verschiebe sie im Kalender.",
    "uk": "у цьому періоді. Перенесіть їх у календарі."
  },
  {
    "es": "El servicio de ese turno ya no existe.",
    "en": "The service for this booking no longer exists.",
    "de": "Die Leistung für diesen Termin existiert nicht mehr.",
    "uk": "Послуги для цього запису більше не існує."
  },
  {
    "es": "Cortes, productos, bebidas y propinas.",
    "en": "Services, products, drinks and tips.",
    "de": "Leistungen, Produkte, Getränke und Trinkgeld.",
    "uk": "Послуги, товари, напої та чайові."
  },
  {
    "es": "Cada servicio con corte suma un sello.",
    "en": "Each qualifying service adds one loyalty stamp.",
    "de": "Jede passende Leistung gibt einen Treuestempel.",
    "uk": "Кожна відповідна послуга додає одну відмітку лояльності."
  },
  {
    "es": "Crop francés, flequillo corto y recto",
    "en": "French crop, short straight fringe",
    "de": "French Crop, kurzer gerader Pony",
    "uk": "Французький кроп, короткий прямий чубчик"
  },
  {
    "es": "cuántos cortes me faltan para el 50%?",
    "en": "How many visits are left until the 50% reward?",
    "de": "Wie viele Besuche fehlen noch bis zur 50-%-Prämie?",
    "uk": "Скільки візитів залишилося до знижки 50%?"
  },
  {
    "es": "Crop francés, flequillo corto y recto",
    "en": "French crop, short straight fringe",
    "de": "French Crop, kurzer gerader Pony",
    "uk": "Французький кроп, короткий прямий чубчик"
  },
  {
    "es": "cuántos cortes me faltan para el 50%?",
    "en": "How many visits are left until the 50% reward?",
    "de": "Wie viele Besuche fehlen noch bis zur 50-%-Prämie?",
    "uk": "Скільки візитів залишилося до знижки 50%?"
  },
  {
    "es": "sin fecha de sus cortes, no se cargó.",
    "en": "no service date; not loaded.",
    "de": "kein Leistungsdatum; nicht geladen.",
    "uk": "немає дати послуг; не завантажено."
  },
  {
    "es": "New password (at least 12 characters)",
    "en": "New password (at least 12 characters)",
    "de": "Neues Passwort (mindestens 12 Zeichen)",
    "uk": "Новий пароль (від 12 символів)"
  },
  {
    "es": "Suma sello en la tarjeta de fidelidad",
    "en": "Adds a loyalty stamp",
    "de": "Gibt einen Treuestempel",
    "uk": "Додає відмітку лояльності"
  },
  {
    "es": "sin cantidad de cortes, no se cargó.",
    "en": "no service quantity; not loaded.",
    "de": "keine Leistungsmenge; nicht geladen.",
    "uk": "немає кількості послуг; не завантажено."
  },
  {
    "es": "cada profile admite un solo WhatsApp",
    "en": "each profile supports one WhatsApp account",
    "de": "jedes Profil unterstützt ein WhatsApp-Konto",
    "uk": "кожен профіль підтримує один акаунт WhatsApp"
  },
  {
    "es": "Hola! tenés turno mañana a la tarde?",
    "en": "Hi! Do you have an appointment tomorrow afternoon?",
    "de": "Hallo! Gibt es morgen Nachmittag einen Termin?",
    "uk": "Привіт! Є запис на завтра після обіду?"
  },
  {
    "es": "Los mensajes quedan para el equipo.",
    "en": "Messages stay with the team.",
    "de": "Nachrichten bleiben beim Team.",
    "uk": "Повідомлення залишаються команді."
  },
  {
    "es": "WhatsApp (para recordarte el turno)",
    "en": "WhatsApp (for booking reminders)",
    "de": "WhatsApp (für Terminerinnerungen)",
    "uk": "WhatsApp (для нагадування про запис)"
  },
  {
    "es": "y el siguiente corte te sale al 50%",
    "en": "and your next service is 50% off",
    "de": "und deine nächste Leistung ist 50 % günstiger",
    "uk": "і наступна послуга буде зі знижкою 50%"
  },
  {
    "es": "Staff logins · Individual passwords",
    "en": "Staff logins · Individual passwords",
    "de": "Mitarbeiterzugänge · Eigene Passwörter",
    "uk": "Доступ співробітників · Окремі паролі"
  },
  {
    "es": "Inventory · Products, stock & sales",
    "en": "Inventory · Products, stock & sales",
    "de": "Lager · Produkte, Bestand und Verkauf",
    "uk": "Склад · Товари, залишки й продажі"
  },
  {
    "es": "Change staff commission percentages",
    "en": "Change staff commission percentages",
    "de": "Provisionssätze bearbeiten",
    "uk": "Змінити відсотки співробітників"
  },
  {
    "es": "No transactions within this period.",
    "en": "No transactions within this period.",
    "de": "Keine Transaktionen in diesem Zeitraum.",
    "uk": "За цей період операцій немає."
  },
  {
    "es": "Elegí un día en que el local abre.",
    "en": "Choose a day when the business is open.",
    "de": "Wähle einen Tag, an dem der Betrieb geöffnet ist.",
    "uk": "Оберіть день, коли заклад працює."
  },
  {
    "es": "No encontré el turno o el barbero.",
    "en": "Booking or staff member not found.",
    "de": "Termin oder Mitarbeiter nicht gefunden.",
    "uk": "Запис або майстра не знайдено."
  },
  {
    "es": "¡Tenés la tarjeta completa, Gonza!",
    "en": "Your loyalty card is complete!",
    "de": "Deine Treuekarte ist voll!",
    "uk": "Картка лояльності заповнена!"
  },
  {
    "es": "[Respondió una persona del equipo]",
    "en": "[A team member replied]",
    "de": "[Ein Teammitglied hat geantwortet]",
    "uk": "[Відповів працівник команди]"
  },
  {
    "es": "Dos franjas del mismo día se pisan",
    "en": "Two time ranges on the same day overlap",
    "de": "Zwei Zeiträume am selben Tag überschneiden sich",
    "uk": "Два часові проміжки в один день перетинаються"
  },
  {
    "es": "no tiene 10 dígitos (no se cargó).",
    "en": "does not have 10 digits (not loaded).",
    "de": "hat nicht 10 Ziffern (nicht geladen).",
    "uk": "не має 10 цифр (не завантажено)."
  },
  {
    "es": "Barber ranks · Service permissions",
    "en": "Barber ranks · Service permissions",
    "de": "Barbier-Stufen · Leistungen",
    "uk": "Рівні барберів · Доступні послуги"
  },
  {
    "es": "Analytics · Day, week, month, year",
    "en": "Analytics · Day, week, month, year",
    "de": "Analysen · Tag, Woche, Monat, Jahr",
    "uk": "Аналітика · День, тиждень, місяць, рік"
  },
  {
    "es": "Descripción (ej. hojas de afeitar)",
    "en": "Description (e.g. razor blades)",
    "de": "Beschreibung (z. B. Rasierklingen)",
    "uk": "Опис (наприклад, леза)"
  },
  {
    "es": "Booking · Appointments made simple",
    "en": "Booking · Appointments made simple",
    "de": "Termin · Terminbuchung leicht gemacht",
    "uk": "Запис · Зручний онлайн-запис"
  },
  {
    "es": "Agregar franja (corte al mediodía)",
    "en": "Add shift interval",
    "de": "Zeitfenster hinzufügen",
    "uk": "Додати проміжок"
  },
  {
    "es": "Cuántos tiene y si le toca el 50%.",
    "en": "Current loyalty count and whether the 50% reward is ready.",
    "de": "Aktueller Treuestand und ob die 50-%-Prämie verfügbar ist.",
    "uk": "Поточний статус лояльності й чи доступна знижка 50%."
  },
  {
    "es": "Poné un monto de seña mayor a $0.",
    "en": "Enter a deposit amount greater than $0.",
    "de": "Einen Anzahlungsbetrag größer als $0 eingeben.",
    "uk": "Вкажіть суму передоплати більше $0."
  },
  {
    "es": "Buenas! hasta qué hora están hoy?",
    "en": "Hi! What time are you open until today?",
    "de": "Hallo! Bis wann habt ihr heute geöffnet?",
    "uk": "Привіт! До котрої сьогодні працюєте?"
  },
  {
    "es": "Buenas! hasta qué hora están hoy?",
    "en": "Hi! What time are you open until today?",
    "de": "Hallo! Bis wann habt ihr heute geöffnet?",
    "uk": "Привіт! До котрої сьогодні працюєте?"
  },
  {
    "es": "ZERNIO_API_KEY es demasiado corta",
    "en": "ZERNIO_API_KEY is too short",
    "de": "ZERNIO_API_KEY ist zu kurz",
    "uk": "ZERNIO_API_KEY надто короткий"
  },
  {
    "es": "El turno ya está con ese barbero.",
    "en": "The booking is already assigned to that staff member.",
    "de": "Der Termin ist diesem Mitarbeiter bereits zugewiesen.",
    "uk": "Запис уже призначено цьому майстру."
  },
  {
    "es": "Volvé a consultar disponibilidad.",
    "en": "Check availability again.",
    "de": "Verfügbarkeit erneut prüfen.",
    "uk": "Перевірте доступність ще раз."
  },
  {
    "es": "ZERNIO_WEBHOOK_SECRET is missing.",
    "en": "ZERNIO_WEBHOOK_SECRET is missing.",
    "de": "ZERNIO_WEBHOOK_SECRET fehlt.",
    "uk": "Відсутній ZERNIO_WEBHOOK_SECRET."
  },
  {
    "es": "No quedan turnos por atender hoy.",
    "en": "No bookings left to serve today.",
    "de": "Heute sind keine Termine mehr offen.",
    "uk": "На сьогодні більше немає записів."
  },
  {
    "es": "Sólo los del cliente que escribe.",
    "en": "Only bookings belonging to the client who is writing.",
    "de": "Nur Termine des schreibenden Kunden.",
    "uk": "Лише записи клієнта, який пише."
  },
  {
    "es": "error procesando la notificación",
    "en": "error processing notification",
    "de": "Fehler bei der Verarbeitung der Benachrichtigung",
    "uk": "помилка обробки сповіщення"
  },
  {
    "es": "Respondió una consulta de ${who}",
    "en": "Answered a question from ${who}",
    "de": "Anfrage von ${who} beantwortet",
    "uk": "Відповів на запит ${who}"
  },
  {
    "es": "Choose a valid service and time.",
    "en": "Choose a valid service and time.",
    "de": "Wähle eine gültige Leistung und Uhrzeit.",
    "uk": "Виберіть правильну послугу та час."
  },
  {
    "es": ", and their advances this week (",
    "en": ", and their advances this week (",
    "de": ", und ihre Vorschüsse in dieser Woche (",
    "uk": ", а їхні аванси за цей тиждень ("
  },
  {
    "es": "Consultó la tarjeta de fidelidad",
    "en": "Checked the loyalty card",
    "de": "Treuekarte geprüft",
    "uk": "Перевірено картку лояльності"
  },
  {
    "es": "That username is already in use.",
    "en": "That username is already in use.",
    "de": "Dieser Benutzername wird bereits verwendet.",
    "uk": "Це ім’я користувача вже зайняте."
  },
  {
    "es": "Poné un nombre para el servicio.",
    "en": "Enter a service name.",
    "de": "Leistungsnamen eingeben.",
    "uk": "Введіть назву послуги."
  },
  {
    "es": "Se ofrece (agenda, web y agente)",
    "en": "Available in schedule, web and AI",
    "de": "In Kalender, Web und KI verfügbar",
    "uk": "Доступно в календарі, вебі та AI"
  },
  {
    "es": "Link copiado: mandáselo al dueño",
    "en": "Link copied. Send it to the owner.",
    "de": "Link kopiert. An den Inhaber senden.",
    "uk": "Посилання скопійовано. Надішліть власнику."
  },
  {
    "es": "Ej: los sábados no agendar color",
    "en": "Example: do not book color services on Saturdays",
    "de": "Beispiel: samstags keine Farbservices buchen",
    "uk": "Наприклад: у суботу не записувати на фарбування"
  },
  {
    "es": "Sin vales ni pagos esta semana.",
    "en": "No advances or payouts this week.",
    "de": "Keine Vorschüsse oder Auszahlungen diese Woche.",
    "uk": "Цього тижня немає авансів або виплат."
  },
  {
    "es": "Elegí el corte y quién lo hace.",
    "en": "Choose a service and staff member.",
    "de": "Leistung und Mitarbeiter wählen.",
    "uk": "Оберіть послугу та майстра."
  },
  {
    "es": "Elegí a quién le diste el vale.",
    "en": "Choose who received the advance.",
    "de": "Wähle, wer den Vorschuss erhalten hat.",
    "uk": "Оберіть, хто отримав аванс."
  },
  {
    "es": "Hojas, capas, alcohol y toallas",
    "en": "Blades, capes, alcohol and towels",
    "de": "Klingen, Umhänge, Alkohol und Handtücher",
    "uk": "Леза, накидки, спирт і рушники"
  },
  {
    "es": "¡Te esperamos en Oncativo 2022!",
    "en": "See you at our location!",
    "de": "Wir sehen uns bei uns vor Ort!",
    "uk": "Чекаємо вас у нашому закладі!"
  },
  {
    "es": "Ese horario se acaba de ocupar.",
    "en": "That time was just taken.",
    "de": "Dieser Termin wurde gerade belegt.",
    "uk": "Цей час щойно зайняли."
  },
  {
    "es": "Business está cerrado that day.",
    "en": "The business is closed that day.",
    "de": "Der Betrieb ist an diesem Tag geschlossen.",
    "uk": "Заклад цього дня зачинений."
  },
  {
    "es": "No available slots on this day.",
    "en": "No available slots on this day.",
    "de": "An diesem Tag sind keine Termine frei.",
    "uk": "На цей день немає вільних місць."
  },
  {
    "es": "¿A quién se le pagó? (opcional)",
    "en": "Who was paid? (optional)",
    "de": "An wen wurde gezahlt? (optional)",
    "uk": "Кому виплачено? (необов’язково)"
  },
  {
    "es": "Available appointment intervals",
    "en": "Available appointment intervals",
    "de": "Verfügbare Buchungsintervalle",
    "uk": "Доступні інтервали запису"
  },
  {
    "es": "No hay clientes con ese filtro.",
    "en": "No clients match this filter.",
    "de": "Keine Kunden entsprechen diesem Filter.",
    "uk": "Немає клієнтів за цим фільтром."
  },
  {
    "es": "No encuentro un hueco libre de",
    "en": "No free slot found for",
    "de": "Kein freier Zeitraum gefunden für",
    "uk": "Не знайдено вільного проміжку для"
  },
  {
    "es": "resuelto, devolvéselo a la IA.",
    "en": "resolved, return it to the AI Agent.",
    "de": "gelöst, wieder an den KI-Assistenten übergeben.",
    "uk": "вирішено, поверніть розмову AI-асистенту."
  },
  {
    "es": "No appointments scheduled yet.",
    "en": "No appointments scheduled yet.",
    "de": "Noch keine Termine geplant.",
    "uk": "Записів поки немає."
  },
  {
    "es": "We are confirming your payment",
    "en": "We are confirming your payment",
    "de": "Wir bestätigen gerade deine Zahlung",
    "uk": "Ми підтверджуємо ваш платіж"
  },
  {
    "es": "WhatsApp / Instagram provider:",
    "en": "WhatsApp / Instagram provider:",
    "de": "WhatsApp-/Instagram-Anbindung:",
    "uk": "Підключення WhatsApp / Instagram:"
  },
  {
    "es": "ZERNIO_WEBHOOK_SECRET required",
    "en": "ZERNIO_WEBHOOK_SECRET required",
    "de": "ZERNIO_WEBHOOK_SECRET erforderlich",
    "uk": "Потрібен ZERNIO_WEBHOOK_SECRET"
  },
  {
    "es": "Sign in with Face ID / passkey",
    "en": "Sign in with Face ID / passkey",
    "de": "Mit Face ID / Passkey anmelden",
    "uk": "Увійти через Face ID / ключ доступу"
  },
  {
    "es": "Contar los sellos de fidelidad",
    "en": "Share loyalty status",
    "de": "Treuestatus mitteilen",
    "uk": "Повідомляти статус лояльності"
  },
  {
    "es": "Ese día el local está cerrado.",
    "en": "The business is closed that day.",
    "de": "Der Betrieb ist an diesem Tag geschlossen.",
    "uk": "Заклад цього дня зачинений."
  },
  {
    "es": "los mismos días del mes pasado",
    "en": "the same days last month",
    "de": "dieselben Tage im letzten Monat",
    "uk": "ті самі дні минулого місяця"
  },
  {
    "es": "Todavía no hubo actividad hoy.",
    "en": "No activity yet today.",
    "de": "Heute noch keine Aktivität.",
    "uk": "Сьогодні активності ще не було."
  },
  {
    "es": "Como máximo 60 días seguidos.",
    "en": "Maximum 60 consecutive days.",
    "de": "Maximal 60 Tage am Stück.",
    "uk": "Максимум 60 днів поспіль."
  },
  {
    "es": "Ventana de WhatsApp abierta: ",
    "en": "WhatsApp window open: ",
    "de": "WhatsApp-Fenster offen: ",
    "uk": "Вікно WhatsApp відкрите: "
  },
  {
    "es": " h para responder libremente.",
    "en": " h left to reply freely.",
    "de": " Std. zum freien Antworten.",
    "uk": " год для вільної відповіді."
  },
  {
    "es": "Cancela un turno del cliente.",
    "en": "Cancels a client booking.",
    "de": "Storniert einen Kundentermin.",
    "uk": "Скасовує запис клієнта."
  },
  {
    "es": "que no es un barbero conocido",
    "en": "is not a known staff member",
    "de": "ist kein bekannter Mitarbeiter",
    "uk": "не є відомим майстром"
  },
  {
    "es": "Webhook de mensajes entrantes",
    "en": "Incoming message webhook",
    "de": "Webhook für eingehende Nachrichten",
    "uk": "Вебхук вхідних повідомлень"
  },
  {
    "es": "Buscar por nombre o teléfono…",
    "en": "Search by name or phone…",
    "de": "Nach Name oder Telefon suchen…",
    "uk": "Пошук за ім’ям або телефоном…"
  },
  {
    "es": "Compressed photo is too large",
    "en": "Compressed photo is too large",
    "de": "Komprimiertes Foto ist zu groß",
    "uk": "Стиснуте фото завелике"
  },
  {
    "es": "Completá descripción y monto.",
    "en": "Enter a description and amount.",
    "de": "Beschreibung und Betrag eingeben.",
    "uk": "Вкажіть опис і суму."
  },
  {
    "es": "Motivo (sólo lo ve el equipo)",
    "en": "Reason (team only)",
    "de": "Grund (nur Team)",
    "uk": "Причина (лише для команди)"
  },
  {
    "es": "vuelve a responder este chat",
    "en": "is responding to this chat again",
    "de": "antwortet wieder in diesem Chat",
    "uk": "знову відповідає в цьому чаті"
  },
  {
    "es": "No encontré la conversación.",
    "en": "Conversation not found.",
    "de": "Unterhaltung nicht gefunden.",
    "uk": "Розмову не знайдено."
  },
  {
    "es": "Reservá online en un minuto.",
    "en": "Book online in a minute.",
    "de": "Online in einer Minute buchen.",
    "uk": "Запишіться онлайн за хвилину."
  },
  {
    "es": "La IA respondió con un error",
    "en": "The AI provider returned an error",
    "de": "Der KI-Anbieter hat einen Fehler zurückgegeben",
    "uk": "AI-провайдер повернув помилку"
  },
  {
    "es": "Payroll · Custom date ranges",
    "en": "Payroll · Custom date ranges",
    "de": "Abrechnung · Freier Zeitraum",
    "uk": "Зарплата · Довільний період"
  },
  {
    "es": "Cash collection / withdrawal",
    "en": "Cash collection / withdrawal",
    "de": "Bargeldentnahme / Abholung",
    "uk": "Інкасація / зняття готівки"
  },
  {
    "es": "Cash withdrawal / collection",
    "en": "Cash withdrawal / collection",
    "de": "Bargeldentnahme / Abholung",
    "uk": "Зняття / інкасація готівки"
  },
  {
    "es": "Turno reprogramado por la IA",
    "en": "Booking rescheduled by AI",
    "de": "Termin von KI verschoben",
    "uk": "Запис перенесено AI"
  },
  {
    "es": "Informar precios y servicios",
    "en": "Answer about prices and services",
    "de": "Preise und Leistungen nennen",
    "uk": "Повідомляти ціни та послуги"
  },
  {
    "es": "Photo processing unavailable",
    "en": "Photo processing unavailable",
    "de": "Fotobearbeitung nicht verfügbar",
    "uk": "Обробка фото недоступна"
  },
  {
    "es": "Falta el nombre del cliente.",
    "en": "Client name is required.",
    "de": "Kundenname fehlt.",
    "uk": "Потрібне ім’я клієнта."
  },
  {
    "es": "La comisión va de 0 a 100 %.",
    "en": "Commission must be between 0 and 100%.",
    "de": "Provision muss zwischen 0 und 100 % liegen.",
    "uk": "Комісія має бути від 0 до 100%."
  },
  {
    "es": "¡el próximo corte va al 50%!",
    "en": "the next qualifying service is 50% off!",
    "de": "die nächste passende Leistung ist 50 % günstiger!",
    "uk": "наступна відповідна послуга зі знижкою 50%!"
  },
  {
    "es": "Comisión sobre cada servicio",
    "en": "Commission on each service",
    "de": "Provision pro Leistung",
    "uk": "Комісія з кожної послуги"
  },
  {
    "es": "cliente llega, se anota con",
    "en": "when the client arrives, create a",
    "de": "wenn der Kunde kommt, erstelle einen",
    "uk": "коли клієнт приходить, створіть"
  },
  {
    "es": "ingresos − sueldos − gastos",
    "en": "revenue − payouts − expenses",
    "de": "Umsatz − Auszahlungen − Ausgaben",
    "uk": "дохід − виплати − витрати"
  },
  {
    "es": "Falta el cliente del turno.",
    "en": "Booking client is missing.",
    "de": "Kunde für den Termin fehlt.",
    "uk": "Відсутній клієнт запису."
  },
  {
    "es": "🔥🔥🔥 quedó terrible el corte",
    "en": "🔥🔥🔥 the haircut turned out great",
    "de": "🔥🔥🔥 der Haarschnitt ist richtig gut geworden",
    "uk": "🔥🔥🔥 стрижка вийшла дуже круто"
  },
  {
    "es": "🔥🔥🔥 quedó terrible el corte",
    "en": "🔥🔥🔥 the haircut turned out great",
    "de": "🔥🔥🔥 der Haarschnitt ist richtig gut geworden",
    "uk": "🔥🔥🔥 стрижка вийшла дуже круто"
  },
  {
    "es": "Create / change credentials",
    "en": "Create / change credentials",
    "de": "Zugangsdaten erstellen / ändern",
    "uk": "Створити або змінити доступ"
  },
  {
    "es": "Service permissions by rank",
    "en": "Service permissions by rank",
    "de": "Leistungsberechtigungen nach Stufe",
    "uk": "Послуги за рівнями"
  },
  {
    "es": "Service permissions by rank",
    "en": "Service permissions by rank",
    "de": "Leistungsberechtigungen nach Stufe",
    "uk": "Послуги за рівнями"
  },
  {
    "es": "Create / update staff login",
    "en": "Create / update staff login",
    "de": "Mitarbeiterzugang anlegen / ändern",
    "uk": "Створити або змінити доступ"
  },
  {
    "es": "Create / change credentials",
    "en": "Create / change credentials",
    "de": "Zugangsdaten erstellen / ändern",
    "uk": "Створити або змінити доступ"
  },
  {
    "es": "Service permissions by rank",
    "en": "Service permissions by rank",
    "de": "Leistungsberechtigungen nach Stufe",
    "uk": "Послуги за рівнями"
  },
  {
    "es": "No appointments left today.",
    "en": "No appointments left today.",
    "de": "Heute keine weiteren Termine.",
    "uk": "На сьогодні записів більше немає."
  },
  {
    "es": "Payments in selected period",
    "en": "Payments in selected period",
    "de": "Zahlungen im ausgewählten Zeitraum",
    "uk": "Оплати за вибраний період"
  },
  {
    "es": "Could not process the image",
    "en": "Could not process the image",
    "de": "Bild konnte nicht verarbeitet werden",
    "uk": "Не вдалося обробити зображення"
  },
  {
    "es": "Poné el nombre del cliente.",
    "en": "Enter the client name.",
    "de": "Kundennamen eingeben.",
    "uk": "Введіть ім’я клієнта."
  },
  {
    "es": "No encontré ese turno fijo.",
    "en": "Fixed booking not found.",
    "de": "Fixtermin nicht gefunden.",
    "uk": "Постійний запис не знайдено."
  },
  {
    "es": "y sus vales de esta semana",
    "en": "and this week's advances",
    "de": "und die Vorschüsse dieser Woche",
    "uk": "і аванси цього тижня"
  },
  {
    "es": "Esa hora todavía no llegó.",
    "en": "That time has not arrived yet.",
    "de": "Diese Uhrzeit ist noch nicht erreicht.",
    "uk": "Цей час ще не настав."
  },
  {
    "es": "Payment method (for sales)",
    "en": "Payment method (for sales)",
    "de": "Zahlungsart (beim Verkauf)",
    "uk": "Спосіб оплати (продаж)"
  },
  {
    "es": "Receive / Sell / Write off",
    "en": "Receive / Sell / Write off",
    "de": "Wareneingang / Verkauf / Abschreibung",
    "uk": "Прихід / Продаж / Списання"
  },
  {
    "es": "Pasar turno a otro barbero",
    "en": "Move booking to another staff member",
    "de": "Termin zu einem anderen Mitarbeiter verschieben",
    "uk": "Перенести запис до іншого майстра"
  },
  {
    "es": "No hay turnos disponibles.",
    "en": "There are no available appointments.",
    "de": "Keine Termine verfügbar.",
    "uk": "Немає вільних записів."
  },
  {
    "es": "Receive / Sell / Write off",
    "en": "Receive / Sell / Write off",
    "de": "Wareneingang / Verkauf / Abschreibung",
    "uk": "Прихід / Продаж / Списання"
  },
  {
    "es": "Working hours and absences",
    "en": "Working hours and absences",
    "de": "Arbeitszeiten und Abwesenheiten",
    "uk": "Робочі години та відсутності"
  },
  {
    "es": "No tiene turnos agendados.",
    "en": "No upcoming bookings.",
    "de": "Keine bevorstehenden Termine.",
    "uk": "Немає майбутніх записів."
  },
  {
    "es": "Probá con alguno de estos:",
    "en": "Try one of these:",
    "de": "Probiere eines davon:",
    "uk": "Спробуйте один із варіантів:"
  },
  {
    "es": "El agente está escribiendo",
    "en": "AI Agent is typing",
    "de": "KI-Assistent schreibt",
    "uk": "AI-асистент друкує"
  },
  {
    "es": "Ese turno ya está cobrado.",
    "en": "This booking has already been paid.",
    "de": "Dieser Termin wurde bereits bezahlt.",
    "uk": "Цей запис уже оплачено."
  },
  {
    "es": "No encontré a esa persona.",
    "en": "Person not found.",
    "de": "Person nicht gefunden.",
    "uk": "Людину не знайдено."
  },
  {
    "es": "Elegí 30, 45 o 60 minutos.",
    "en": "Choose 30, 45 or 60 minutes.",
    "de": "30, 45 oder 60 Minuten wählen.",
    "uk": "Оберіть 30, 45 або 60 хвилин."
  },
  {
    "es": "De dónde vienen los turnos",
    "en": "Booking sources",
    "de": "Terminherkunft",
    "uk": "Джерела записів"
  },
  {
    "es": "cuánto sale corte y barba?",
    "en": "how much is a haircut and beard service?",
    "de": "Wie viel kostet Haarschnitt und Bart?",
    "uk": "Скільки коштує стрижка та борода?"
  },
  {
    "es": "Respondé vos; cuando esté",
    "en": "Reply yourself; when it is",
    "de": "Antworte selbst; wenn es",
    "uk": "Відповідайте самі; коли"
  },
  {
    "es": "Respondió una consulta de",
    "en": "Answered a question from",
    "de": "Anfrage beantwortet von",
    "uk": "Відповів на запит від"
  },
  {
    "es": "¡Hola Nahuel! Para Corte:",
    "en": "Hi! For Haircut:",
    "de": "Hallo! Für Haarschnitt:",
    "uk": "Привіт! Для стрижки:"
  },
  {
    "es": "a la tarde? corte y barba",
    "en": "in the afternoon for hair and beard?",
    "de": "am Nachmittag für Haare und Bart?",
    "uk": "після обіду на стрижку й бороду?"
  },
  {
    "es": "Sumar a alguien al equipo",
    "en": "Add a team member",
    "de": "Teammitglied hinzufügen",
    "uk": "Додати співробітника"
  },
  {
    "es": "View earnings and payouts",
    "en": "View earnings and payouts",
    "de": "Verdienst und Auszahlungen anzeigen",
    "uk": "Переглянути заробіток і виплати"
  },
  {
    "es": "What it can do on its own",
    "en": "What it can do on its own",
    "de": "Was der Assistent selbstständig erledigt",
    "uk": "Що асистент може робити самостійно"
  },
  {
    "es": "Webhook secret configured",
    "en": "Webhook secret configured",
    "de": "Webhook-Secret hinterlegt",
    "uk": "Секретний ключ вебхука налаштовано"
  },
  {
    "es": "Turno cancelado por la IA",
    "en": "Booking cancelled by AI",
    "de": "Termin von KI storniert",
    "uk": "Запис скасовано AI"
  },
  {
    "es": "Registered through invite",
    "en": "Registered through invite",
    "de": "Über Einladung registriert",
    "uk": "Зареєстровано за запрошенням"
  },
  {
    "es": "Create your staff account",
    "en": "Create your staff account",
    "de": "Mitarbeiterkonto erstellen",
    "uk": "Створити обліковий запис працівника"
  },
  {
    "es": "Elegí barbero y servicio.",
    "en": "Choose a staff member and service.",
    "de": "Mitarbeiter und Leistung wählen.",
    "uk": "Оберіть майстра та послугу."
  },
  {
    "es": "Elegí servicio y barbero.",
    "en": "Choose a service and staff member.",
    "de": "Leistung und Mitarbeiter wählen.",
    "uk": "Оберіть послугу та майстра."
  },
  {
    "es": "No encontré ese servicio.",
    "en": "Service not found.",
    "de": "Leistung nicht gefunden.",
    "uk": "Послугу не знайдено."
  },
  {
    "es": "Reactivar este turno fijo",
    "en": "Reactivate this fixed booking",
    "de": "Diesen Fixtermin reaktivieren",
    "uk": "Відновити цей постійний запис"
  },
  {
    "es": "Turno creado en la agenda",
    "en": "Booking created in the schedule",
    "de": "Termin im Kalender erstellt",
    "uk": "Запис створено в календарі"
  },
  {
    "es": "comisión de los barberos",
    "en": "staff commissions",
    "de": "Mitarbeiterprovisionen",
    "uk": "комісії майстрів"
  },
  {
    "es": "dale, le mando una foto?",
    "en": "okay, should I send a photo?",
    "de": "okay, soll ich ein Foto schicken?",
    "uk": "добре, надіслати фото?"
  },
  {
    "es": "Hoy ya estamos completos",
    "en": "We're fully booked today",
    "de": "Heute sind wir ausgebucht",
    "uk": "На сьогодні все зайнято"
  },
  {
    "es": "sellos, Gonza. Te faltan",
    "en": "stamps. You need",
    "de": "Stempel. Dir fehlen",
    "uk": "штампів. Залишилося"
  },
  {
    "es": "Buenas! tenés turno para",
    "en": "Hi! Do you have an appointment for",
    "de": "Hi! Hast du einen Termin für",
    "uk": "Привіт! Є вільний запис на"
  },
  {
    "es": "para Corte + barba tengo",
    "en": "for Haircut + beard I have",
    "de": "für Haarschnitt + Bart habe ich",
    "uk": "на стрижку + бороду є"
  },
  {
    "es": "dale, le mando una foto?",
    "en": "Okay, should I send a photo?",
    "de": "Okay, soll ich ein Foto schicken?",
    "uk": "Добре, надіслати фото?"
  },
  {
    "es": "¡De nada! Te esperamos 💈",
    "en": "You're welcome! See you soon 💈",
    "de": "Gern! Bis bald 💈",
    "uk": "Будь ласка! До зустрічі 💈"
  },
  {
    "es": "Cancelado por el agente:",
    "en": "Cancelled by AI Agent:",
    "de": "Vom KI-Assistenten storniert:",
    "uk": "Скасовано AI-асистентом:"
  },
  {
    "es": " h left to reply freely.",
    "en": " h left to reply freely.",
    "de": " Std. zum freien Antworten.",
    "uk": " год для вільної відповіді."
  },
  {
    "es": "Any available specialist",
    "en": "Any available specialist",
    "de": "Beliebige verfügbare Fachkraft",
    "uk": "Будь-який доступний спеціаліст"
  },
  {
    "es": "Base de datos (Supabase)",
    "en": "Database (Supabase)",
    "de": "Datenbank (Supabase)",
    "uk": "База даних (Supabase)"
  },
  {
    "es": "Turno agendado por la IA",
    "en": "Booking created by AI",
    "de": "Termin von KI erstellt",
    "uk": "Запис створено AI"
  },
  {
    "es": "Could not compress photo",
    "en": "Could not compress photo",
    "de": "Foto konnte nicht komprimiert werden",
    "uk": "Не вдалося стиснути фото"
  },
  {
    "es": "Revisá el monto contado.",
    "en": "Check the counted amount.",
    "de": "Gezählten Betrag prüfen.",
    "uk": "Перевірте пораховану суму."
  },
  {
    "es": "cortes al 50% entregados",
    "en": "50% rewards redeemed",
    "de": "50-%-Prämien eingelöst",
    "uk": "використано знижок 50%"
  },
  {
    "es": "Cobro rápido (sin turno)",
    "en": "Quick checkout (walk-in)",
    "de": "Schnellkasse (ohne Termin)",
    "uk": "Швидка оплата (без запису)"
  },
  {
    "es": "Escribí como un cliente…",
    "en": "Write as a client…",
    "de": "Wie ein Kunde schreiben…",
    "uk": "Напишіть як клієнт…"
  },
  {
    "es": "Agente activo otra vez.",
    "en": "AI Agent is active again.",
    "de": "KI-Assistent ist wieder aktiv.",
    "uk": "AI-асистент знову активний."
  },
  {
    "es": "y reiniciá el servidor.",
    "en": "and restart the server.",
    "de": "eintragen und Server neu starten.",
    "uk": "і перезапустіть сервер."
  },
  {
    "es": "Ej. Juan, corte y barba",
    "en": "Example: client, hair and beard",
    "de": "Beispiel: Kunde, Haare und Bart",
    "uk": "Наприклад: клієнт, стрижка та борода"
  },
  {
    "es": "Le informó los sellos a",
    "en": "Shared loyalty status with",
    "de": "Treuestatus mitgeteilt an",
    "uk": "Повідомив статус лояльності для"
  },
  {
    "es": "Falta ZERNIO_PROFILE_ID",
    "en": "ZERNIO_PROFILE_ID is missing",
    "de": "ZERNIO_PROFILE_ID fehlt",
    "uk": "Відсутній ZERNIO_PROFILE_ID"
  },
  {
    "es": "Revenue / expense trend",
    "en": "Revenue / expense trend",
    "de": "Umsatz- und Ausgabentrend",
    "uk": "Динаміка доходів і витрат"
  },
  {
    "es": "Elegí una conversación.",
    "en": "Select a conversation.",
    "de": "Wähle eine Unterhaltung.",
    "uk": "Оберіть розмову."
  },
  {
    "es": "Hay cambios sin guardar",
    "en": "There are unsaved changes",
    "de": "Es gibt ungespeicherte Änderungen",
    "uk": "Є незбережені зміни"
  },
  {
    "es": "Responsible / recipient",
    "en": "Responsible / recipient",
    "de": "Verantwortlich / Empfänger",
    "uk": "Відповідальний / отримувач"
  },
  {
    "es": "HANDED OFF TO TO PERSON",
    "en": "HANDED OFF TO STAFF",
    "de": "AN MITARBEITENDE ÜBERGEBEN",
    "uk": "ПЕРЕДАНО СПІВРОБІТНИКАМ"
  },
  {
    "es": "ZERNIO_API_KEY required",
    "en": "ZERNIO_API_KEY required",
    "de": "ZERNIO_API_KEY erforderlich",
    "uk": "Потрібен ZERNIO_API_KEY"
  },
  {
    "es": "Business currency saved",
    "en": "Business currency saved",
    "de": "Geschäftswährung gespeichert",
    "uk": "Валюту закладу збережено"
  },
  {
    "es": "Falta la clave de la IA",
    "en": "AI key is missing",
    "de": "KI-Schlüssel fehlt",
    "uk": "Відсутній ключ AI"
  },
  {
    "es": "Fecha u hora inválidas.",
    "en": "Invalid date or time.",
    "de": "Ungültiges Datum oder Uhrzeit.",
    "uk": "Некоректна дата або час."
  },
  {
    "es": "No encontré ese franco.",
    "en": "Time off not found.",
    "de": "Abwesenheit nicht gefunden.",
    "uk": "Відсутність не знайдено."
  },
  {
    "es": "suma sello de fidelidad",
    "en": "adds loyalty stamp",
    "de": "gibt Treuestempel",
    "uk": "додає відмітку лояльності"
  },
  {
    "es": "de comisión + propinas",
    "en": "commission + tips",
    "de": "Provision + Trinkgeld",
    "uk": "комісія + чайові"
  },
  {
    "es": "Facturado en la semana",
    "en": "Weekly revenue",
    "de": "Wochenumsatz",
    "uk": "Дохід за тиждень"
  },
  {
    "es": "El agente pidió ayuda:",
    "en": "The AI Agent requested help:",
    "de": "Der KI-Assistent hat Hilfe angefordert:",
    "uk": "AI-асистент попросив допомоги:"
  },
  {
    "es": "Contraseña incorrecta.",
    "en": "Incorrect password.",
    "de": "Falsches Passwort.",
    "uk": "Неправильний пароль."
  },
  {
    "es": "Ese barbero no existe.",
    "en": "That staff member does not exist.",
    "de": "Dieser Mitarbeiter existiert nicht.",
    "uk": "Такого майстра не існує."
  },
  {
    "es": "El mensaje está vacío.",
    "en": "The message is empty.",
    "de": "Die Nachricht ist leer.",
    "uk": "Повідомлення порожнє."
  },
  {
    "es": "Terminó, cobro después",
    "en": "Completed, pay later",
    "de": "Erledigt, später bezahlen",
    "uk": "Завершено, оплата пізніше"
  },
  {
    "es": "Reprogramó el turno de",
    "en": "Rescheduled the booking for",
    "de": "Termin verschoben für",
    "uk": "Переніс запис для"
  },
  {
    "es": "WhatsApp window open: ",
    "en": "WhatsApp window open: ",
    "de": "WhatsApp-Fenster offen: ",
    "uk": "Вікно WhatsApp відкрите: "
  },
  {
    "es": "Recent stock movements",
    "en": "Recent stock movements",
    "de": "Letzte Lagerbewegungen",
    "uk": "Останні рухи товарів"
  },
  {
    "es": "Today's cash transfers",
    "en": "Today's cash transfers",
    "de": "Heutige Bargeldtransfers",
    "uk": "Рух готівки сьогодні"
  },
  {
    "es": "Cash deposit to drawer",
    "en": "Cash deposit to drawer",
    "de": "Bareinlage in die Kasse",
    "uk": "Внесення готівки в касу"
  },
  {
    "es": "de comisión + propinas",
    "en": "commission + tips",
    "de": "Provision + Trinkgeld",
    "uk": "комісія + чайові"
  },
  {
    "es": "Disable employee login",
    "en": "Disable employee login",
    "de": "Mitarbeiterzugang deaktivieren",
    "uk": "Вимкнути доступ"
  },
  {
    "es": "Recent stock movements",
    "en": "Recent stock movements",
    "de": "Letzte Lagerbewegungen",
    "uk": "Останні рухи товарів"
  },
  {
    "es": "Calendar quick actions",
    "en": "Calendar quick actions",
    "de": "Kalender-Schnellaktionen",
    "uk": "Швидкі дії календаря"
  },
  {
    "es": "No cash movements yet.",
    "en": "No cash movements yet.",
    "de": "Noch keine Bargeldbewegungen.",
    "uk": "Рухів готівки поки немає."
  },
  {
    "es": "e.g. Cleaning supplies",
    "en": "e.g. Cleaning supplies",
    "de": "z. B. Reinigungsmittel",
    "uk": "Наприклад, засоби для прибирання"
  },
  {
    "es": "Appointment not found.",
    "en": "Appointment not found.",
    "de": "Termin nicht gefunden.",
    "uk": "Запис не знайдено."
  },
  {
    "es": "Administrator password",
    "en": "Administrator password",
    "de": "Administratorpasswort",
    "uk": "Пароль адміністратора"
  },
  {
    "es": "No cash movements yet.",
    "en": "No cash movements yet.",
    "de": "Noch keine Bargeldbewegungen.",
    "uk": "Рухів готівки поки немає."
  },
  {
    "es": "Fondo de caja al abrir",
    "en": "Opening cash float",
    "de": "Kassenbestand bei Öffnung",
    "uk": "Стартова готівка в касі"
  },
  {
    "es": "No encontré ese turno.",
    "en": "Booking not found.",
    "de": "Termin nicht gefunden.",
    "uk": "Запис не знайдено."
  },
  {
    "es": "de los turnos cerrados",
    "en": "of closed bookings",
    "de": "der abgeschlossenen Termine",
    "uk": "від закритих записів"
  },
  {
    "es": "Los turnos que tomó el",
    "en": "Bookings created by the",
    "de": "Vom",
    "uk": "Записи, створені"
  },
  {
    "es": "No se acreditó el pago",
    "en": "Payment not received",
    "de": "Zahlung nicht eingegangen",
    "uk": "Оплату не отримано"
  },
  {
    "es": "Todavía no hay cobros.",
    "en": "No payments yet.",
    "de": "Noch keine Zahlungen.",
    "uk": "Оплат ще немає."
  },
  {
    "es": "Cerrar la caja del día",
    "en": "Close today's cash",
    "de": "Tageskasse schließen",
    "uk": "Закрити касу за день"
  },
  {
    "es": "Fondo de caja guardado",
    "en": "Opening cash saved",
    "de": "Kassenbestand gespeichert",
    "uk": "Стартову суму збережено"
  },
  {
    "es": "Pausar este turno fijo",
    "en": "Pause this fixed booking",
    "de": "Diesen Fixtermin pausieren",
    "uk": "Призупинити цей постійний запис"
  },
  {
    "es": "turnos que agendó solo",
    "en": "bookings created automatically",
    "de": "automatisch erstellte Termine",
    "uk": "записів створено автоматично"
  },
  {
    "es": "Guardado. Ojo: ya hay",
    "en": "Saved. Note: there are already",
    "de": "Gespeichert. Hinweis: Es gibt bereits",
    "uk": "Збережено. Увага: вже є"
  },
  {
    "es": "Escribí tu respuesta…",
    "en": "Write your reply…",
    "de": "Antwort schreiben…",
    "uk": "Напишіть відповідь…"
  },
  {
    "es": "Reposición de insumos",
    "en": "Restocking supplies",
    "de": "Material nachfüllen",
    "uk": "Поповнення матеріалів"
  },
  {
    "es": "aceptan mercado pago?",
    "en": "Do you accept Mercado Pago?",
    "de": "Akzeptiert ihr Mercado Pago?",
    "uk": "Приймаєте Mercado Pago?"
  },
  {
    "es": "¿Cuál te queda mejor?",
    "en": "Which works best for you?",
    "de": "Was passt dir am besten?",
    "uk": "Який час вам найкраще підходить?"
  },
  {
    "es": "aceptan mercado pago?",
    "en": "Do you accept Mercado Pago?",
    "de": "Akzeptiert ihr Mercado Pago?",
    "uk": "Приймаєте Mercado Pago?"
  },
  {
    "es": "sin barbero asignado.",
    "en": "without an assigned staff member.",
    "de": "ohne zugewiesenen Mitarbeiter.",
    "uk": "без призначеного майстра."
  },
  {
    "es": "Administrator sign in",
    "en": "Administrator sign in",
    "de": "Administrator-Anmeldung",
    "uk": "Вхід адміністратора"
  },
  {
    "es": "Upcoming appointments",
    "en": "Upcoming appointments",
    "de": "Anstehende Termine",
    "uk": "Майбутні записи"
  },
  {
    "es": "Cash movement history",
    "en": "Cash movement history",
    "de": "Verlauf der Bargeldbewegungen",
    "uk": "Історія руху готівки"
  },
  {
    "es": "AI integration status",
    "en": "AI integration status",
    "de": "KI-Integrationsstatus",
    "uk": "Статус інтеграції AI"
  },
  {
    "es": "Messaging connections",
    "en": "Messaging connections",
    "de": "Nachrichtenverbindungen",
    "uk": "Підключення повідомлень"
  },
  {
    "es": "Open Railway settings",
    "en": "Open Railway settings",
    "de": "Railway-Einstellungen öffnen",
    "uk": "Відкрити налаштування Railway"
  },
  {
    "es": "No quedan turnos hoy.",
    "en": "No bookings left today.",
    "de": "Heute keine weiteren Termine.",
    "uk": "На сьогодні записів більше немає."
  },
  {
    "es": "Enable employee login",
    "en": "Enable employee login",
    "de": "Mitarbeiterzugang aktivieren",
    "uk": "Увімкнути доступ"
  },
  {
    "es": "Administrator sign in",
    "en": "Administrator sign in",
    "de": "Administrator-Anmeldung",
    "uk": "Вхід адміністратора"
  },
  {
    "es": "Upcoming appointments",
    "en": "Upcoming appointments",
    "de": "Anstehende Termine",
    "uk": "Майбутні записи"
  },
  {
    "es": "Owner, bank, employee",
    "en": "Owner, bank, employee",
    "de": "Inhaber, Bank, Mitarbeiter",
    "uk": "Власник, банк, співробітник"
  },
  {
    "es": "Your business address",
    "en": "Your business address",
    "de": "Adresse Ihres Betriebs",
    "uk": "Адреса вашого закладу"
  },
  {
    "es": "Appointment completed",
    "en": "Appointment completed",
    "de": "Termin abgeschlossen",
    "uk": "Візит завершено"
  },
  {
    "es": "Add Face ID / passkey",
    "en": "Add Face ID / passkey",
    "de": "Face ID / Passkey hinzufügen",
    "uk": "Додати Face ID / ключ доступу"
  },
  {
    "es": "Un horario nuevo cada",
    "en": "Offer a slot every",
    "de": "Neuer Slot alle",
    "uk": "Пропонувати час кожні"
  },
  {
    "es": "Seña con Mercado Pago",
    "en": "Booking deposit",
    "de": "Anzahlung",
    "uk": "Передоплата"
  },
  {
    "es": "no hace este servicio",
    "en": "does not provide this service",
    "de": "bietet diese Leistung nicht an",
    "uk": "не надає цю послугу"
  },
  {
    "es": "Secciones de ajustes",
    "en": "Settings sections",
    "de": "Einstellungsbereiche",
    "uk": "Розділи налаштувань"
  },
  {
    "es": "Se edita en Ajustes.",
    "en": "Edit it in Settings.",
    "de": "Unter Einstellungen bearbeiten.",
    "uk": "Редагується в Налаштуваннях."
  },
  {
    "es": "sin vales ni sueldos",
    "en": "excluding advances and payouts",
    "de": "ohne Vorschüsse und Auszahlungen",
    "uk": "без авансів і виплат"
  },
  {
    "es": "Reclamo por un corte",
    "en": "Complaint about a service",
    "de": "Beschwerde über eine Leistung",
    "uk": "Скарга на послугу"
  },
  {
    "es": " no tiene huecos de ",
    "en": " has no free slots of ",
    "de": " hat keine freien Zeitfenster von ",
    "uk": " не має вільних проміжків по "
  },
  {
    "es": "TARJETA DE FIDELIDAD",
    "en": "LOYALTY CARD",
    "de": "TREUEKARTE",
    "uk": "КАРТКА ЛОЯЛЬНОСТІ"
  },
  {
    "es": "Agendó un turno para",
    "en": "Created a booking for",
    "de": "Termin erstellt für",
    "uk": "Створив запис для"
  },
  {
    "es": "Ese horario ya pasó.",
    "en": "That time has already passed.",
    "de": "Diese Uhrzeit ist bereits vorbei.",
    "uk": "Цей час уже минув."
  },
  {
    "es": "Choose date and time",
    "en": "Choose date and time",
    "de": "Datum und Uhrzeit wählen",
    "uk": "Виберіть дату та час"
  },
  {
    "es": "Contraseña del panel",
    "en": "Panel password",
    "de": "Panel-Passwort",
    "uk": "Пароль панелі"
  },
  {
    "es": "Ver el día siguiente",
    "en": "View next day",
    "de": "Nächsten Tag ansehen",
    "uk": "Переглянути наступний день"
  },
  {
    "es": "has no free slots of",
    "en": "has no available slots of",
    "de": "hat keine freien Zeitfenster von",
    "uk": "не має вільних проміжків тривалістю"
  },
  {
    "es": "Horario de la semana",
    "en": "Weekly schedule",
    "de": "Wochenplan",
    "uk": "Тижневий графік"
  },
  {
    "es": "Francos y vacaciones",
    "en": "Days off and holidays",
    "de": "Freie Tage und Urlaub",
    "uk": "Вихідні та відпустки"
  },
  {
    "es": "Invalid credentials.",
    "en": "Invalid credentials.",
    "de": "Ungültige Zugangsdaten.",
    "uk": "Неправильні дані входу."
  },
  {
    "es": "Record cash movement",
    "en": "Record cash movement",
    "de": "Bargeldbewegung erfassen",
    "uk": "Записати рух готівки"
  },
  {
    "es": "Supplier / recipient",
    "en": "Supplier / recipient",
    "de": "Lieferant / Empfänger",
    "uk": "Постачальник / отримувач"
  },
  {
    "es": "Invalid appointment.",
    "en": "Invalid appointment.",
    "de": "Ungültiger Termin.",
    "uk": "Некоректний запис."
  },
  {
    "es": "for completed visits",
    "en": "for completed visits",
    "de": "für abgeschlossene Besuche",
    "uk": "за завершені візити"
  },
  {
    "es": "Personalized service",
    "en": "Personalized service",
    "de": "Individueller Service",
    "uk": "Індивідуальна послуга"
  },
  {
    "es": "Admin panon password",
    "en": "Administrator password",
    "de": "Administratorpasswort",
    "uk": "Пароль адміністратора"
  },
  {
    "es": "Agendar primer turno",
    "en": "Create first booking",
    "de": "Ersten Termin anlegen",
    "uk": "Створити перший запис"
  },
  {
    "es": "Tarjeta de fidelidad",
    "en": "Loyalty card",
    "de": "Treuekarte",
    "uk": "Картка лояльності"
  },
  {
    "es": "Sin gastos cargados.",
    "en": "No expenses recorded.",
    "de": "Keine Ausgaben erfasst.",
    "uk": "Витрат немає."
  },
  {
    "es": "Qué puede hacer solo",
    "en": "What it can do on its own",
    "de": "Was der Assistent selbstständig erledigt",
    "uk": "Що асистент може робити самостійно"
  },
  {
    "es": "Select profile photo",
    "en": "Select profile photo",
    "de": "Profilfoto auswählen",
    "uk": "Вибрати фото профілю"
  },
  {
    "es": "Argentine peso (ARS)",
    "en": "Argentine peso (ARS)",
    "de": "Argentinischer Peso (ARS)",
    "uk": "Аргентинське песо (ARS)"
  },
  {
    "es": "Generate invite link",
    "en": "Generate invite link",
    "de": "Einladungslink erstellen",
    "uk": "Створити посилання-запрошення"
  },
  {
    "es": "Elegí quién atiende.",
    "en": "Choose who provides the service.",
    "de": "Mitarbeiter auswählen.",
    "uk": "Оберіть майстра."
  },
  {
    "es": "en lo que va del mes",
    "en": "month to date",
    "de": "im laufenden Monat",
    "uk": "від початку місяця"
  },
  {
    "es": "Premios de fidelidad",
    "en": "Loyalty rewards",
    "de": "Treueprämien",
    "uk": "Нагороди лояльності"
  },
  {
    "es": "Por día de la semana",
    "en": "By weekday",
    "de": "Nach Wochentag",
    "uk": "За днем тижня"
  },
  {
    "es": "Derivó a una persona",
    "en": "Handed off to a person",
    "de": "An Person übergeben",
    "uk": "Передано людині"
  },
  {
    "es": "quejas, color, dudas",
    "en": "complaints, special requests, questions",
    "de": "Beschwerden, Sonderwünsche, Fragen",
    "uk": "скарги, особливі запити, питання"
  },
  {
    "es": "Tocá para aplicarlo.",
    "en": "Tap to apply.",
    "de": "Tippen zum Anwenden.",
    "uk": "Натисніть, щоб застосувати."
  },
  {
    "es": "Buen día de trabajo.",
    "en": "Good work today.",
    "de": "Guter Arbeitstag.",
    "uk": "Хороший робочий день."
  },
  {
    "es": "Servicio actualizado",
    "en": "Service updated",
    "de": "Leistung aktualisiert",
    "uk": "Послугу оновлено"
  },
  {
    "es": "Horario de la semana",
    "en": "Weekly schedule",
    "de": "Wochenplan",
    "uk": "Тижневий графік"
  },
  {
    "es": "ya está en el equipo",
    "en": "is now on the team",
    "de": "ist jetzt im Team",
    "uk": "тепер у команді"
  },
  {
    "es": "Pasar a otro barbero",
    "en": "Move to another staff member",
    "de": "Zu anderem Mitarbeiter verschieben",
    "uk": "Перенести до іншого майстра"
  },
  {
    "es": "Internet y teléfono",
    "en": "Internet and phone",
    "de": "Internet und Telefon",
    "uk": "Інтернет і телефон"
  },
  {
    "es": "Canceló el turno de",
    "en": "Cancelled the booking for",
    "de": "Termin storniert für",
    "uk": "Скасував запис для"
  },
  {
    "es": "¿Te reservo alguno?",
    "en": "Would you like me to book one?",
    "de": "Soll ich einen Termin buchen?",
    "uk": "Записати вас на один із них?"
  },
  {
    "es": "Choose a specialist",
    "en": "Choose a specialist",
    "de": "Fachkraft auswählen",
    "uk": "Виберіть спеціаліста"
  },
  {
    "es": "Disable staff login",
    "en": "Disable staff login",
    "de": "Mitarbeiterzugang deaktivieren",
    "uk": "Вимкнути доступ співробітника"
  },
  {
    "es": "Low stock threshold",
    "en": "Low stock threshold",
    "de": "Mindestbestand",
    "uk": "Мінімальний залишок"
  },
  {
    "es": "Outstanding payroll",
    "en": "Outstanding payroll",
    "de": "Ausstehende Auszahlung",
    "uk": "Залишок до виплати"
  },
  {
    "es": "Outstanding payroll",
    "en": "Outstanding payroll",
    "de": "Ausstehende Auszahlung",
    "uk": "Залишок до виплати"
  },
  {
    "es": "Expected cash today",
    "en": "Expected cash today",
    "de": "Erwarteter Bargeldbestand heute",
    "uk": "Очікувана готівка сьогодні"
  },
  {
    "es": "What was purchased?",
    "en": "What was purchased?",
    "de": "Wofür wurde bezahlt?",
    "uk": "На що витрачено?"
  },
  {
    "es": "Teléfono (opcional)",
    "en": "Phone (optional)",
    "de": "Telefon (optional)",
    "uk": "Телефон (необов’язково)"
  },
  {
    "es": "Lo agendó el agente",
    "en": "Booked by the agent",
    "de": "Vom Assistenten gebucht",
    "uk": "Записано асистентом"
  },
  {
    "es": "Low stock threshold",
    "en": "Low stock threshold",
    "de": "Mindestbestand",
    "uk": "Мінімальний залишок"
  },
  {
    "es": "Appointment created",
    "en": "Appointment created",
    "de": "Termin erstellt",
    "uk": "Запис створено"
  },
  {
    "es": "Outstanding payroll",
    "en": "Outstanding payroll",
    "de": "Ausstehende Auszahlung",
    "uk": "Залишок до виплати"
  },
  {
    "es": "No staff added yet.",
    "en": "No staff added yet.",
    "de": "Noch keine Mitarbeitenden.",
    "uk": "Співробітників поки немає."
  },
  {
    "es": "Open administration",
    "en": "Open administration",
    "de": "Verwaltung öffnen",
    "uk": "Відкрити адміністрацію"
  },
  {
    "es": "View daily schedule",
    "en": "View daily schedule",
    "de": "Tagesplan ansehen",
    "uk": "Переглянути графік дня"
  },
  {
    "es": "Closed on this date",
    "en": "Closed on this date",
    "de": "An diesem Tag geschlossen",
    "uk": "Цього дня зачинено"
  },
  {
    "es": "Close calendar menu",
    "en": "Close calendar menu",
    "de": "Kalendermenü schließen",
    "uk": "Закрити меню календаря"
  },
  {
    "es": "No se pudo conectar",
    "en": "Could not connect",
    "de": "Verbindung fehlgeschlagen",
    "uk": "Не вдалося підключитися"
  },
  {
    "es": "Bebidas y productos",
    "en": "Drinks and products",
    "de": "Getränke und Produkte",
    "uk": "Напої та товари"
  },
  {
    "es": "Professional levels",
    "en": "Professional levels",
    "de": "Qualifikationsstufen",
    "uk": "Професійні рівні"
  },
  {
    "es": "Choose a specialist",
    "en": "Choose a specialist",
    "de": "Fachkraft auswählen",
    "uk": "Виберіть спеціаліста"
  },
  {
    "es": "HANDED OFF TO STAFF",
    "en": "HANDED OFF TO STAFF",
    "de": "AN MITARBEITENDE ÜBERGEBEN",
    "uk": "ПЕРЕДАНО СПІВРОБІТНИКАМ"
  },
  {
    "es": "No-show appointment",
    "en": "No-show appointment",
    "de": "Nicht erschienen",
    "uk": "Клієнт не з’явився"
  },
  {
    "es": "Insumos y productos",
    "en": "Supplies & products",
    "de": "Material & Produkte",
    "uk": "Матеріали й товари"
  },
  {
    "es": "Luz, gas e internet",
    "en": "Utilities & internet",
    "de": "Nebenkosten & Internet",
    "uk": "Комунальні та інтернет"
  },
  {
    "es": "Waiting for device…",
    "en": "Waiting for device…",
    "de": "Warte auf Gerät…",
    "uk": "Очікування пристрою…"
  },
  {
    "es": "Add a staff passkey",
    "en": "Add a staff passkey",
    "de": "Mitarbeiter-Passkey hinzufügen",
    "uk": "Додати ключ доступу працівника"
  },
  {
    "es": "Horario de apertura",
    "en": "Opening hours",
    "de": "Öffnungszeiten",
    "uk": "Години роботи"
  },
  {
    "es": "Elegí una duración.",
    "en": "Choose a duration.",
    "de": "Dauer wählen.",
    "uk": "Оберіть тривалість."
  },
  {
    "es": "Categoría inválida.",
    "en": "Invalid category.",
    "de": "Ungültige Kategorie.",
    "uk": "Некоректна категорія."
  },
  {
    "es": "Hoy les toca el 50%",
    "en": "50% reward today",
    "de": "Heute 50 % Vorteil",
    "uk": "Сьогодні знижка 50%"
  },
  {
    "es": "Servicios y precios",
    "en": "Services & prices",
    "de": "Leistungen & Preise",
    "uk": "Послуги й ціни"
  },
  {
    "es": "Turno fijo guardado",
    "en": "Fixed booking saved",
    "de": "Fixtermin gespeichert",
    "uk": "Постійний запис збережено"
  },
  {
    "es": "chats atendidos hoy",
    "en": "chats handled today",
    "de": "heute bearbeitete Chats",
    "uk": "чатів оброблено сьогодні"
  },
  {
    "es": "Barbershop · Panel",
    "en": "Appointments · Panel",
    "de": "Termine · Verwaltung",
    "uk": "Записи · Панель"
  },
  {
    "es": "Guardar turno fijo",
    "en": "Save fixed booking",
    "de": "Fixtermin speichern",
    "uk": "Зберегти постійний запис"
  },
  {
    "es": "por su cuenta hoy.",
    "en": "automatically today.",
    "de": "heute automatisch erstellt.",
    "uk": "автоматично сьогодні."
  },
  {
    "es": "no quedó conectado",
    "en": "was not connected",
    "de": "wurde nicht verbunden",
    "uk": "не підключено"
  },
  {
    "es": "Sueldos y propinas",
    "en": "Staff payouts and tips",
    "de": "Auszahlungen und Trinkgeld",
    "uk": "Виплати й чайові"
  },
  {
    "es": "Le queda a la casa",
    "en": "Business share",
    "de": "Anteil des Betriebs",
    "uk": "Залишається закладу"
  },
  {
    "es": "¿Dudas? Escribinos",
    "en": "Questions? Message us",
    "de": "Fragen? Schreib uns",
    "uk": "Є питання? Напишіть нам"
  },
  {
    "es": "Alquiler del local",
    "en": "Business rent",
    "de": "Miete des Betriebs",
    "uk": "Оренда закладу"
  },
  {
    "es": "¿Cuándo hay lugar?",
    "en": "When is there availability?",
    "de": "Wann ist etwas frei?",
    "uk": "Коли є вільний час?"
  },
  {
    "es": "Limpieza del local",
    "en": "Business cleaning",
    "de": "Reinigung des Betriebs",
    "uk": "Прибирання закладу"
  },
  {
    "es": " visitas · última ",
    "en": " visits · last ",
    "de": " Besuche · zuletzt ",
    "uk": " візитів · останній "
  },
  {
    "es": "Listo ✂️ Te agendé",
    "en": "Done ✂️ I booked",
    "de": "Fertig ✂️ Ich habe gebucht:",
    "uk": "Готово ✂️ Я записав:"
  },
  {
    "es": "Esperado al cerrar",
    "en": "Expected at close",
    "de": "Erwartet beim Abschluss",
    "uk": "Очікується при закритті"
  },
  {
    "es": "Enable staff login",
    "en": "Enable staff login",
    "de": "Mitarbeiterzugang aktivieren",
    "uk": "Увімкнути доступ співробітника"
  },
  {
    "es": "Create appointment",
    "en": "Create appointment",
    "de": "Termin erstellen",
    "uk": "Створити запис"
  },
  {
    "es": "Expense categories",
    "en": "Expense categories",
    "de": "Ausgabenkategorien",
    "uk": "Категорії витрат"
  },
  {
    "es": "Business analytics",
    "en": "Business analytics",
    "de": "Geschäftsanalysen",
    "uk": "Аналітика бізнесу"
  },
  {
    "es": "Duración del turno",
    "en": "Booking duration",
    "de": "Termindauer",
    "uk": "Тривалість запису"
  },
  {
    "es": "Tarjeta de crédito",
    "en": "Credit card",
    "de": "Kreditkarte",
    "uk": "Кредитна картка"
  },
  {
    "es": "Quitar esta franja",
    "en": "Remove this time range",
    "de": "Zeitfenster entfernen",
    "uk": "Видалити проміжок"
  },
  {
    "es": "Professional level",
    "en": "Professional level",
    "de": "Berufsstufe",
    "uk": "Рівень барбера"
  },
  {
    "es": "Create appointment",
    "en": "Create appointment",
    "de": "Termin erstellen",
    "uk": "Створити запис"
  },
  {
    "es": "Professional level",
    "en": "Professional level",
    "de": "Berufsstufe",
    "uk": "Рівень барбера"
  },
  {
    "es": "Team · all barbers",
    "en": "Team · all barbers",
    "de": "Team · alle Barbiere",
    "uk": "Команда · всі барбери"
  },
  {
    "es": "Cierre por persona",
    "en": "Closing per person",
    "de": "Abrechnung je Person",
    "uk": "Підсумок за співробітником"
  },
  {
    "es": "Minutos para pagar",
    "en": "Minutes to pay",
    "de": "Zahlungsfrist in Minuten",
    "uk": "Час на оплату (хв)"
  },
  {
    "es": "Products and stock",
    "en": "Products and stock",
    "de": "Produkte und Lager",
    "uk": "Товари та склад"
  },
  {
    "es": "Cancel appointment",
    "en": "Cancel appointment",
    "de": "Termin stornieren",
    "uk": "Скасувати запис"
  },
  {
    "es": "Team · all barbers",
    "en": "Team · all barbers",
    "de": "Team · alle Barbiere",
    "uk": "Команда · всі барбери"
  },
  {
    "es": "Incoming messages:",
    "en": "Incoming messages:",
    "de": "Eingehende Nachrichten:",
    "uk": "Вхідні повідомлення:"
  },
  {
    "es": "API key configured",
    "en": "API key configured",
    "de": "API-Schlüssel hinterlegt",
    "uk": "API-ключ налаштовано"
  },
  {
    "es": "Reprogramar turnos",
    "en": "Reschedule bookings",
    "de": "Termine verschieben",
    "uk": "Переносити записи"
  },
  {
    "es": "Hora en que empezó",
    "en": "Start time",
    "de": "Beginn",
    "uk": "Час початку"
  },
  {
    "es": "Revisá las fechas.",
    "en": "Check the dates.",
    "de": "Daten prüfen.",
    "uk": "Перевірте дати."
  },
  {
    "es": "Esa fecha ya pasó.",
    "en": "That date has already passed.",
    "de": "Dieses Datum ist bereits vorbei.",
    "uk": "Ця дата вже минула."
  },
  {
    "es": "Lo último que hizo",
    "en": "Latest activity",
    "de": "Letzte Aktivität",
    "uk": "Остання активність"
  },
  {
    "es": "¡Turno confirmado!",
    "en": "Booking confirmed!",
    "de": "Termin bestätigt!",
    "uk": "Запис підтверджено!"
  },
  {
    "es": "cobros · servicios",
    "en": "payments · services",
    "de": "Zahlungen · Leistungen",
    "uk": "оплат · послуг"
  },
  {
    "es": "Caja cerrada a las",
    "en": "Cash closed at",
    "de": "Kasse geschlossen um",
    "uk": "Касу закрито о"
  },
  {
    "es": "Guardar corrección",
    "en": "Save correction",
    "de": "Korrektur speichern",
    "uk": "Зберегти виправлення"
  },
  {
    "es": "Turno fijo quitado",
    "en": "Fixed booking removed",
    "de": "Fixtermin entfernt",
    "uk": "Постійний запис видалено"
  },
  {
    "es": "el siguiente corte",
    "en": "the next qualifying service",
    "de": "die nächste passende Leistung",
    "uk": "наступна відповідна послуга"
  },
  {
    "es": "Local y fidelidad",
    "en": "Business & loyalty",
    "de": "Betrieb & Treue",
    "uk": "Заклад і лояльність"
  },
  {
    "es": "Editar turno fijo",
    "en": "Edit fixed booking",
    "de": "Fixtermin bearbeiten",
    "uk": "Редагувати постійний запис"
  },
  {
    "es": "todas las semanas",
    "en": "every week",
    "de": "jede Woche",
    "uk": "щотижня"
  },
  {
    "es": "tienen turno hoy?",
    "en": "Do you have an appointment today?",
    "de": "Habt ihr heute einen freien Termin?",
    "uk": "Є вільний запис на сьогодні?"
  },
  {
    "es": "Ej. Corte + barba",
    "en": "Example: Hair + beard",
    "de": "Beispiel: Haare + Bart",
    "uk": "Наприклад: стрижка + борода"
  },
  {
    "es": "Hasta (inclusive)",
    "en": "Until (inclusive)",
    "de": "Bis einschließlich",
    "uk": "До (включно)"
  },
  {
    "es": "Aceite para barba",
    "en": "Beard oil",
    "de": "Bartöl",
    "uk": "Олія для бороди"
  },
  {
    "es": "tienen turno hoy?",
    "en": "Do you have an appointment today?",
    "de": "Habt ihr heute einen freien Termin?",
    "uk": "Є вільний запис на сьогодні?"
  },
  {
    "es": "Staff commissions",
    "en": "Staff commissions",
    "de": "Mitarbeiterprovisionen",
    "uk": "Комісії співробітників"
  },
  {
    "es": "Team & commission",
    "en": "Team & commission",
    "de": "Team und Provisionen",
    "uk": "Команда та комісії"
  },
  {
    "es": "Record an expense",
    "en": "Record an expense",
    "de": "Ausgabe erfassen",
    "uk": "Записати витрату"
  },
  {
    "es": "Tarjeta de débito",
    "en": "Debit card",
    "de": "Debitkarte",
    "uk": "Дебетова картка"
  },
  {
    "es": "Local y fidelidad",
    "en": "Venue and loyalty",
    "de": "Standort und Kundenbindung",
    "uk": "Заклад і лояльність"
  },
  {
    "es": "Client checked in",
    "en": "Client checked in",
    "de": "Kunde als angekommen markiert",
    "uk": "Клієнта позначено як такого, що прийшов"
  },
  {
    "es": "Cash and expenses",
    "en": "Cash and expenses",
    "de": "Kasse und Ausgaben",
    "uk": "Каса та витрати"
  },
  {
    "es": "Cancу appointment",
    "en": "Cancel appointment",
    "de": "Termin stornieren",
    "uk": "Скасувати запис"
  },
  {
    "es": ") are withdrawals",
    "en": ") are withdrawals",
    "de": ") gelten als Entnahmen",
    "uk": ") вважаються вилученням коштів"
  },
  {
    "es": "Payment collected",
    "en": "Payment collected",
    "de": "Zahlung eingegangen",
    "uk": "Оплату отримано"
  },
  {
    "es": "Booking completed",
    "en": "Booking completed",
    "de": "Termin abgeschlossen",
    "uk": "Візит завершено"
  },
  {
    "es": "No photo selected",
    "en": "No photo selected",
    "de": "Kein Foto ausgewählt",
    "uk": "Фото не вибрано"
  },
  {
    "es": "Business currency",
    "en": "Business currency",
    "de": "Geschäftswährung",
    "uk": "Валюта закладу"
  },
  {
    "es": "Registration link",
    "en": "Registration link",
    "de": "Registrierungslink",
    "uk": "Посилання для реєстрації"
  },
  {
    "es": "Todas las semanas",
    "en": "Every week",
    "de": "Jede Woche",
    "uk": "Щотижня"
  },
  {
    "es": "Revisá el precio.",
    "en": "Check the price.",
    "de": "Preis prüfen.",
    "uk": "Перевірте ціну."
  },
  {
    "es": "Revisá las horas.",
    "en": "Check the times.",
    "de": "Uhrzeiten prüfen.",
    "uk": "Перевірте час."
  },
  {
    "es": "Acumulado del mes",
    "en": "Monthly cumulative",
    "de": "Monat kumuliert",
    "uk": "Накопичено за місяць"
  },
  {
    "es": "Turnos que agendó",
    "en": "Bookings created",
    "de": "Erstellte Termine",
    "uk": "Створено записів"
  },
  {
    "es": "Efectivo esperado",
    "en": "Expected cash",
    "de": "Erwartetes Bargeld",
    "uk": "Очікувана готівка"
  },
  {
    "es": "Servicio agregado",
    "en": "Service added",
    "de": "Leistung hinzugefügt",
    "uk": "Послугу додано"
  },
  {
    "es": "Sin turnos fijos.",
    "en": "No fixed bookings.",
    "de": "Keine Fixtermine.",
    "uk": "Немає постійних записів."
  },
  {
    "es": "Quitar turno fijo",
    "en": "Remove fixed booking",
    "de": "Fixtermin entfernen",
    "uk": "Видалити постійний запис"
  },
  {
    "es": "Turno confirmado",
    "en": "Booking confirmed",
    "de": "Termin bestätigt",
    "uk": "Запис підтверджено"
  },
  {
    "es": "Nuevo turno fijo",
    "en": "New fixed booking",
    "de": "Neuer Fixtermin",
    "uk": "Новий постійний запис"
  },
  {
    "es": "El agente agendó",
    "en": "The AI Agent created",
    "de": "Der KI-Assistent hat",
    "uk": "AI-асистент створив"
  },
  {
    "es": "Gastos del local",
    "en": "Business expenses",
    "de": "Betriebsausgaben",
    "uk": "Витрати закладу"
  },
  {
    "es": "Revisá el monto.",
    "en": "Check the amount.",
    "de": "Betrag prüfen.",
    "uk": "Перевірте суму."
  },
  {
    "es": "Vencida sin seña",
    "en": "Expired without deposit",
    "de": "Ohne Anzahlung abgelaufen",
    "uk": "Прострочено без передоплати"
  },
  {
    "es": "Ninguno cargado.",
    "en": "None added.",
    "de": "Noch nichts hinzugefügt.",
    "uk": "Нічого не додано."
  },
  {
    "es": "Choose a service",
    "en": "Choose a service",
    "de": "Leistung auswählen",
    "uk": "Вибір послуг"
  },
  {
    "es": "Products & stock",
    "en": "Products & stock",
    "de": "Produkte und Lagerbestand",
    "uk": "Товари та залишки"
  },
  {
    "es": "No products yet.",
    "en": "No products yet.",
    "de": "Noch keine Produkte.",
    "uk": "Товарів поки немає."
  },
  {
    "es": "Apply date range",
    "en": "Apply date range",
    "de": "Zeitraum anwenden",
    "uk": "Застосувати період"
  },
  {
    "es": "Products & stock",
    "en": "Products & stock",
    "de": "Produkte und Lagerbestand",
    "uk": "Товари та залишки"
  },
  {
    "es": "No products yet.",
    "en": "No products yet.",
    "de": "Noch keine Produkte.",
    "uk": "Товарів поки немає."
  },
  {
    "es": "Arrancó el turno",
    "en": "Booking started",
    "de": "Termin gestartet",
    "uk": "Запис розпочато"
  },
  {
    "es": "Ninguno cargado.",
    "en": "Nothing added yet.",
    "de": "Noch keine Einträge.",
    "uk": "Поки немає записів."
  },
  {
    "es": "No products yet.",
    "en": "No products yet.",
    "de": "Noch keine Produkte.",
    "uk": "Товарів поки немає."
  },
  {
    "es": "Apply date range",
    "en": "Apply date range",
    "de": "Zeitraum anwenden",
    "uk": "Застосувати період"
  },
  {
    "es": "Uploading photo…",
    "en": "Uploading photo…",
    "de": "Foto wird hochgeladen…",
    "uk": "Фото завантажується…"
  },
  {
    "es": "Awaiting payment",
    "en": "Awaiting payment",
    "de": "Zahlung ausstehend",
    "uk": "Очікує оплати"
  },
  {
    "es": "Reporting period",
    "en": "Reporting period",
    "de": "Berichtszeitraum",
    "uk": "Звітний період"
  },
  {
    "es": "Choose a service",
    "en": "Choose a service",
    "de": "Leistung auswählen",
    "uk": "Вибір послуг"
  },
  {
    "es": "No expenses yet.",
    "en": "No expenses yet.",
    "de": "Noch keine Ausgaben.",
    "uk": "Витрат поки немає."
  },
  {
    "es": "Efectivo en caja",
    "en": "Cash on hand",
    "de": "Bargeldbestand",
    "uk": "Готівка в касі"
  },
  {
    "es": "Efectivo contado",
    "en": "Counted cash",
    "de": "Gezähltes Bargeld",
    "uk": "Порахована готівка"
  },
  {
    "es": "Reglas del dueño",
    "en": "Owner rules",
    "de": "Regeln des Inhabers",
    "uk": "Правила власника"
  },
  {
    "es": "Reporting period",
    "en": "Reporting period",
    "de": "Berichtszeitraum",
    "uk": "Звітний період"
  },
  {
    "es": "Uploading photo…",
    "en": "Uploading photo…",
    "de": "Foto wird hochgeladen…",
    "uk": "Фото завантажується…"
  },
  {
    "es": "Monto de la seña",
    "en": "Deposit amount",
    "de": "Anzahlungsbetrag",
    "uk": "Сума передоплати"
  },
  {
    "es": "Reservá tu turno",
    "en": "Book your appointment",
    "de": "Termin buchen",
    "uk": "Записатися"
  },
  {
    "es": "Pagar la seña de",
    "en": "Pay deposit of",
    "de": "Anzahlung zahlen:",
    "uk": "Сплатити передоплату"
  },
  {
    "es": "Ingresos del mes",
    "en": "Monthly revenue",
    "de": "Monatsumsatz",
    "uk": "Дохід за місяць"
  },
  {
    "es": "Turnos atendidos",
    "en": "Completed bookings",
    "de": "Erledigte Termine",
    "uk": "Обслуговані записи"
  },
  {
    "es": "Semana siguiente",
    "en": "Next week",
    "de": "Nächste Woche",
    "uk": "Наступний тиждень"
  },
  {
    "es": "Todavía no vino.",
    "en": "No visits yet.",
    "de": "Noch keine Besuche.",
    "uk": "Ще не приходив."
  },
  {
    "es": "Cierre corregido",
    "en": "Cash closing corrected",
    "de": "Kassenabschluss korrigiert",
    "uk": "Закриття каси виправлено"
  },
  {
    "es": "cortes sellados.",
    "en": "stamps.",
    "de": "Stempel.",
    "uk": "відміток."
  },
  {
    "es": "Agregar servicio",
    "en": "Add service",
    "de": "Leistung hinzufügen",
    "uk": "Додати послугу"
  },
  {
    "es": "Seña desactivada",
    "en": "Deposit disabled",
    "de": "Anzahlung deaktiviert",
    "uk": "Передоплату вимкнено"
  },
  {
    "es": "Elegí un horario",
    "en": "Choose a time",
    "de": "Uhrzeit wählen",
    "uk": "Оберіть час"
  },
  {
    "es": "Turno cancelado",
    "en": "Booking cancelled",
    "de": "Termin storniert",
    "uk": "Запис скасовано"
  },
  {
    "es": "Guardar horario",
    "en": "Save schedule",
    "de": "Arbeitszeit speichern",
    "uk": "Зберегти графік"
  },
  {
    "es": "Guardar cambios",
    "en": "Save changes",
    "de": "Änderungen speichern",
    "uk": "Зберегти зміни"
  },
  {
    "es": "Salir del panel",
    "en": "Log out",
    "de": "Abmelden",
    "uk": "Вийти"
  },
  {
    "es": "Agente en línea",
    "en": "AI Agent online",
    "de": "KI-Assistent online",
    "uk": "AI-асистент онлайн"
  },
  {
    "es": "Confirmar turno",
    "en": "Confirm booking",
    "de": "Termin bestätigen",
    "uk": "Підтвердити запис"
  },
  {
    "es": "Poné tu nombre.",
    "en": "Enter your name.",
    "de": "Namen eingeben.",
    "uk": "Введіть своє ім’я."
  },
  {
    "es": "Agente pausado.",
    "en": "AI Agent paused.",
    "de": "KI-Assistent pausiert.",
    "uk": "AI-асистента призупинено."
  },
  {
    "es": "crack, gracias!",
    "en": "great, thanks!",
    "de": "super, danke!",
    "uk": "супер, дякую!"
  },
  {
    "es": "crack, gracias!",
    "en": "Great, thanks!",
    "de": "Super, danke!",
    "uk": "Чудово, дякую!"
  },
  {
    "es": "no está activo.",
    "en": "is not active.",
    "de": "ist nicht aktiv.",
    "uk": "неактивний."
  },
  {
    "es": "Change language",
    "en": "Change language",
    "de": "Sprache ändern",
    "uk": "Змінити мову"
  },
  {
    "es": "Haircut + beard",
    "en": "Haircut + beard",
    "de": "Haarschnitt + Bart",
    "uk": "Стрижка + борода"
  },
  {
    "es": "Available times",
    "en": "Available times",
    "de": "Verfügbare Zeiten",
    "uk": "Доступний час"
  },
  {
    "es": "Confirm booking",
    "en": "Confirm booking",
    "de": "Termin bestätigen",
    "uk": "Підтвердити запис"
  },
  {
    "es": "New appointment",
    "en": "New appointment",
    "de": "Neuer Termin",
    "uk": "Новий запис"
  },
  {
    "es": "Return to stock",
    "en": "Return to stock",
    "de": "Rückgabe ins Lager",
    "uk": "Повернення на склад"
  },
  {
    "es": "Add team member",
    "en": "Add team member",
    "de": "Teammitglied hinzufügen",
    "uk": "Додати співробітника"
  },
  {
    "es": "Edit commission",
    "en": "Edit commission",
    "de": "Provision bearbeiten",
    "uk": "Змінити відсоток"
  },
  {
    "es": "Service revenue",
    "en": "Service revenue",
    "de": "Umsatz aus Leistungen",
    "uk": "Виручка від послуг"
  },
  {
    "es": "Cash & expenses",
    "en": "Cash & expenses",
    "de": "Kasse und Ausgaben",
    "uk": "Каса та витрати"
  },
  {
    "es": "Cash withdrawal",
    "en": "Cash withdrawal",
    "de": "Bargeldentnahme",
    "uk": "Зняття готівки"
  },
  {
    "es": "Recent expenses",
    "en": "Recent expenses",
    "de": "Letzte Ausgaben",
    "uk": "Останні витрати"
  },
  {
    "es": "Return to stock",
    "en": "Return to stock",
    "de": "Rückgabe ins Lager",
    "uk": "Повернення на склад"
  },
  {
    "es": "New appointment",
    "en": "New appointment",
    "de": "Neuer Termin",
    "uk": "Новий запис"
  },
  {
    "es": "Service revenue",
    "en": "Service revenue",
    "de": "Umsatz aus Leistungen",
    "uk": "Виручка від послуг"
  },
  {
    "es": "Edit commission",
    "en": "Edit commission",
    "de": "Provision bearbeiten",
    "uk": "Змінити відсоток"
  },
  {
    "es": "Change language",
    "en": "Change language",
    "de": "Sprache ändern",
    "uk": "Змінити мову"
  },
  {
    "es": "Use light theme",
    "en": "Use light theme",
    "de": "Helles Design verwenden",
    "uk": "Увімкнути світлу тему"
  },
  {
    "es": "No appointments",
    "en": "No appointments",
    "de": "Keine Termine",
    "uk": "Немає записів"
  },
  {
    "es": "Check-in undone",
    "en": "Check-in undone",
    "de": "Ankunft zurückgenommen",
    "uk": "Позначку приходу скасовано"
  },
  {
    "es": "Cancel bookings",
    "en": "Cancel bookings",
    "de": "Buchungen stornieren",
    "uk": "Скасовувати записи"
  },
  {
    "es": "Mercado Payment",
    "en": "Mercado Pago",
    "de": "Mercado Pago",
    "uk": "Mercado Pago"
  },
  {
    "es": "Volver a llamar",
    "en": "Re-engage",
    "de": "Zurückgewinnen",
    "uk": "Повернути клієнтів"
  },
  {
    "es": "Ticket promedio",
    "en": "Average ticket",
    "de": "Durchschnittsbon",
    "uk": "Середній чек"
  },
  {
    "es": "Link de reserva",
    "en": "Booking link",
    "de": "Buchungslink",
    "uk": "Посилання на запис"
  },
  {
    "es": "Photo not saved",
    "en": "Photo not saved",
    "de": "Foto nicht gespeichert",
    "uk": "Фото не збережено"
  },
  {
    "es": "Service revenue",
    "en": "Service revenue",
    "de": "Umsatz aus Leistungen",
    "uk": "Виручка від послуг"
  },
  {
    "es": "US dollar (USD)",
    "en": "US dollar (USD)",
    "de": "US-Dollar (USD)",
    "uk": "Долар США (USD)"
  },
  {
    "es": "Cancelar turnos",
    "en": "Cancel bookings",
    "de": "Buchungen stornieren",
    "uk": "Скасовувати записи"
  },
  {
    "es": "Revisá la hora.",
    "en": "Check the time.",
    "de": "Uhrzeit prüfen.",
    "uk": "Перевірте час."
  },
  {
    "es": "Poné el nombre.",
    "en": "Enter a name.",
    "de": "Namen eingeben.",
    "uk": "Введіть ім’я."
  },
  {
    "es": "Elegí la fecha.",
    "en": "Choose a date.",
    "de": "Datum auswählen.",
    "uk": "Оберіть дату."
  },
  {
    "es": "el mes anterior",
    "en": "the previous month",
    "de": "der Vormonat",
    "uk": "попередній місяць"
  },
  {
    "es": "le corresponden",
    "en": "payout",
    "de": "Auszahlung",
    "uk": "належить"
  },
  {
    "es": "Semana cerrada.",
    "en": "Closed week.",
    "de": "Abgeschlossene Woche.",
    "uk": "Закритий тиждень."
  },
  {
    "es": "Semana anterior",
    "en": "Previous week",
    "de": "Vorherige Woche",
    "uk": "Попередній тиждень"
  },
  {
    "es": "Últimas visitas",
    "en": "Recent visits",
    "de": "Letzte Besuche",
    "uk": "Останні візити"
  },
  {
    "es": "cobros − gastos",
    "en": "payments − expenses",
    "de": "Einnahmen − Ausgaben",
    "uk": "оплати − витрати"
  },
  {
    "es": "Editar servicio",
    "en": "Edit service",
    "de": "Leistung bearbeiten",
    "uk": "Редагувати послугу"
  },
  {
    "es": "Datos guardados",
    "en": "Details saved",
    "de": "Daten gespeichert",
    "uk": "Дані збережено"
  },
  {
    "es": "Martes a sábado",
    "en": "Tuesday to Saturday",
    "de": "Dienstag bis Samstag",
    "uk": "З вівторка по суботу"
  },
  {
    "es": "¿Cómo se llama?",
    "en": "What's the name?",
    "de": "Wie heißt der Kunde?",
    "uk": "Як звати клієнта?"
  },
  {
    "es": "Turno agendado",
    "en": "Booking created",
    "de": "Termin erstellt",
    "uk": "Запис створено"
  },
  {
    "es": "Hoy, desde las",
    "en": "Today, from",
    "de": "Heute ab",
    "uk": "Сьогодні з"
  },
  {
    "es": "Agente pausado",
    "en": "AI Agent paused",
    "de": "KI-Assistent pausiert",
    "uk": "AI-асистент призупинено"
  },
  {
    "es": "Activar agente",
    "en": "Enable AI Agent",
    "de": "KI-Assistent aktivieren",
    "uk": "Увімкнути AI-асистента"
  },
  {
    "es": "¿Qué te hacés?",
    "en": "What would you like to book?",
    "de": "Welche Leistung möchtest du buchen?",
    "uk": "На яку послугу хочете записатися?"
  },
  {
    "es": "firma inválida",
    "en": "invalid signature",
    "de": "ungültige Signatur",
    "uk": "некоректний підпис"
  },
  {
    "es": "Guardado. Ojo:",
    "en": "Saved. Note:",
    "de": "Gespeichert. Hinweis:",
    "uk": "Збережено. Увага:"
  },
  {
    "es": "en ese horario",
    "en": "in that time range",
    "de": "in diesem Zeitraum",
    "uk": "у цьому проміжку"
  },
  {
    "es": "genial gracias",
    "en": "great, thanks",
    "de": "super, danke",
    "uk": "чудово, дякую"
  },
  {
    "es": " frecuentes · ",
    "en": " regular · ",
    "de": " Stammkunden · ",
    "uk": " постійних · "
  },
  {
    "es": "Recién terminó",
    "en": "Just finished",
    "de": "Gerade beendet",
    "uk": "Щойно завершено"
  },
  {
    "es": "Días completos",
    "en": "Full days",
    "de": "Ganze Tage",
    "uk": "Повні дні"
  },
  {
    "es": "genial gracias",
    "en": "Great, thanks",
    "de": "Super, danke",
    "uk": "Чудово, дякую"
  },
  {
    "es": " already paid)",
    "en": " already paid)",
    "de": " bereits bezahlt)",
    "uk": " вже сплачена)"
  },
  {
    "es": "no existe: usá",
    "en": "is not supported: use",
    "de": "wird nicht unterstützt: verwende",
    "uk": "не підтримується: використовуйте"
  },
  {
    "es": "Weekly payroll",
    "en": "Weekly payroll",
    "de": "Wöchentliche Gehaltsabrechnung",
    "uk": "Тижневі виплати"
  },
  {
    "es": "Panel password",
    "en": "Panel password",
    "de": "Panel-Passwort",
    "uk": "Пароль панелі"
  },
  {
    "es": "Staff accounts",
    "en": "Staff accounts",
    "de": "Mitarbeiterkonten",
    "uk": "Облікові записи співробітників"
  },
  {
    "es": "Save operation",
    "en": "Save operation",
    "de": "Vorgang speichern",
    "uk": "Зберегти операцію"
  },
  {
    "es": "Staff accounts",
    "en": "Staff accounts",
    "de": "Mitarbeiterkonten",
    "uk": "Облікові записи співробітників"
  },
  {
    "es": "Payment method",
    "en": "Payment method",
    "de": "Zahlungsart",
    "uk": "Спосіб оплати"
  },
  {
    "es": "Setup required",
    "en": "Setup required",
    "de": "Einrichtung erforderlich",
    "uk": "Потрібне налаштування"
  },
  {
    "es": "No trabaja hoy",
    "en": "Not working today",
    "de": "Heute nicht im Dienst",
    "uk": "Сьогодні не працює"
  },
  {
    "es": "Cancelar turno",
    "en": "Cancel appointment",
    "de": "Termin stornieren",
    "uk": "Скасувати запис"
  },
  {
    "es": "Agregar franja",
    "en": "Add time range",
    "de": "Zeitfenster hinzufügen",
    "uk": "Додати часовий проміжок"
  },
  {
    "es": "Días completos",
    "en": "Full days",
    "de": "Ganze Tage",
    "uk": "Повні дні"
  },
  {
    "es": "Ventas del día",
    "en": "Today's sales",
    "de": "Heutige Verkäufe",
    "uk": "Продажі за сьогодні"
  },
  {
    "es": "Employee login",
    "en": "Employee login",
    "de": "Mitarbeiteranmeldung",
    "uk": "Вхід співробітника"
  },
  {
    "es": "Save operation",
    "en": "Save operation",
    "de": "Vorgang speichern",
    "uk": "Зберегти операцію"
  },
  {
    "es": "Staff accounts",
    "en": "Staff accounts",
    "de": "Mitarbeiterkonten",
    "uk": "Облікові записи співробітників"
  },
  {
    "es": "No account yet",
    "en": "No account yet",
    "de": "Noch kein Konto",
    "uk": "Акаунта ще немає"
  },
  {
    "es": "Use dark theme",
    "en": "Use dark theme",
    "de": "Dunkles Design verwenden",
    "uk": "Увімкнути темну тему"
  },
  {
    "es": "Administration",
    "en": "Administration",
    "de": "Verwaltung",
    "uk": "Адміністрування"
  },
  {
    "es": "Calendar views",
    "en": "Calendar views",
    "de": "Kalenderansichten",
    "uk": "Режими календаря"
  },
  {
    "es": "Hora de inicio",
    "en": "Start time",
    "de": "Beginn",
    "uk": "Час початку"
  },
  {
    "es": "Le toca el 50%",
    "en": "50% loyalty discount",
    "de": "50 % Treuerabatt",
    "uk": "Знижка 50% за лояльністю"
  },
  {
    "es": "son de la casa",
    "en": "belong to the business",
    "de": "gehören dem Betrieb",
    "uk": "залишаються закладу"
  },
  {
    "es": "(no se ofrece)",
    "en": "(not offered)",
    "de": "(nicht verfügbar)",
    "uk": "(недоступно)"
  },
  {
    "es": "(dado de baja)",
    "en": "(inactive)",
    "de": "(inaktiv)",
    "uk": "(неактивний)"
  },
  {
    "es": "Remove day off",
    "en": "Remove day off",
    "de": "Freien Tag entfernen",
    "uk": "Видалити вихідний"
  },
  {
    "es": "Month calendar",
    "en": "Month calendar",
    "de": "Monatskalender",
    "uk": "Календар місяця"
  },
  {
    "es": "Client arrived",
    "en": "Client arrived",
    "de": "Kunde ist angekommen",
    "uk": "Клієнт прийшов"
  },
  {
    "es": "Registrar pago",
    "en": "Record payment",
    "de": "Zahlung erfassen",
    "uk": "Зареєструвати оплату"
  },
  {
    "es": "Client arrived",
    "en": "Client arrived",
    "de": "Kunde ist angekommen",
    "uk": "Клієнт прийшов"
  },
  {
    "es": "Booking status",
    "en": "Booking status",
    "de": "Terminstatus",
    "uk": "Статус запису"
  },
  {
    "es": "No account yet",
    "en": "No account yet",
    "de": "Noch kein Konto",
    "uk": "Акаунта ще немає"
  },
  {
    "es": "Cierre de caja",
    "en": "Cash closing",
    "de": "Kassenabschluss",
    "uk": "Закриття каси"
  },
  {
    "es": "Medios de pago",
    "en": "Payment methods",
    "de": "Zahlungsarten",
    "uk": "Способи оплати"
  },
  {
    "es": "Responde la IA",
    "en": "AI responds",
    "de": "KI antwortet",
    "uk": "Відповідає AI"
  },
  {
    "es": "Quién responde",
    "en": "Who responds",
    "de": "Wer antwortet",
    "uk": "Хто відповідає"
  },
  {
    "es": "not configured",
    "en": "not configured",
    "de": "nicht konfiguriert",
    "uk": "не налаштовано"
  },
  {
    "es": "Invite expires",
    "en": "Invite expires",
    "de": "Einladung läuft ab",
    "uk": "Запрошення дійсне до"
  },
  {
    "es": "Create account",
    "en": "Create account",
    "de": "Konto erstellen",
    "uk": "Створити обліковий запис"
  },
  {
    "es": "Agendar turnos",
    "en": "Create bookings",
    "de": "Termine anlegen",
    "uk": "Створювати записи"
  },
  {
    "es": "¿Buscás turno?",
    "en": "Looking for an appointment?",
    "de": "Suchst du einen Termin?",
    "uk": "Хочете записатися?"
  },
  {
    "es": "¡Te esperamos!",
    "en": "You're booked!",
    "de": "Termin bestätigt!",
    "uk": "Запис підтверджено!"
  },
  {
    "es": "Elegí a quién.",
    "en": "Choose a person.",
    "de": "Person auswählen.",
    "uk": "Оберіть людину."
  },
  {
    "es": "turnos del día",
    "en": "bookings today",
    "de": "Termine heute",
    "uk": "записів сьогодні"
  },
  {
    "es": "Conversaciones",
    "en": "Conversations",
    "de": "Unterhaltungen",
    "uk": "Розмови"
  },
  {
    "es": "para el premio",
    "en": "until the reward",
    "de": "bis zur Prämie",
    "uk": "до нагороди"
  },
  {
    "es": "Gastos del día",
    "en": "Daily expenses",
    "de": "Tagesausgaben",
    "uk": "Витрати за день"
  },
  {
    "es": "Entró en total",
    "en": "Total received",
    "de": "Gesamteinnahmen",
    "uk": "Надійшло всього"
  },
  {
    "es": "Seña ya pagada",
    "en": "Deposit already paid",
    "de": "Anzahlung bereits bezahlt",
    "uk": "Передоплату вже сплачено"
  },
  {
    "es": "Fidelidad −50%",
    "en": "Loyalty −50%",
    "de": "Treue −50 %",
    "uk": "Лояльність −50%"
  },
  {
    "es": "Nuevo servicio",
    "en": "New service",
    "de": "Neue Leistung",
    "uk": "Нова послуга"
  },
  {
    "es": "Guardar franco",
    "en": "Save time off",
    "de": "Abwesenheit speichern",
    "uk": "Зберегти відсутність"
  },
  {
    "es": "Más secciones",
    "en": "More sections",
    "de": "Weitere Bereiche",
    "uk": "Інші розділи"
  },
  {
    "es": "Configuración",
    "en": "Configuration",
    "de": "Konfiguration",
    "uk": "Конфігурація"
  },
  {
    "es": "Guardar gasto",
    "en": "Save expense",
    "de": "Ausgabe speichern",
    "uk": "Зберегти витрату"
  },
  {
    "es": "Booking — Hoy",
    "en": "Booking — Today",
    "de": "Termin — Heute",
    "uk": "Запис — Сьогодні"
  },
  {
    "es": "Empezó a las…",
    "en": "Started at…",
    "de": "Begann um…",
    "uk": "Почалося о…"
  },
  {
    "es": "Mostrar más (",
    "en": "Show more (",
    "de": "Mehr anzeigen (",
    "uk": "Показати ще ("
  },
  {
    "es": "Corte + barba",
    "en": "Haircut + beard",
    "de": "Haarschnitt + Bart",
    "uk": "Стрижка + борода"
  },
  {
    "es": "a una persona",
    "en": "to a person",
    "de": "an eine Person",
    "uk": "людині"
  },
  {
    "es": "Hoy me quedan",
    "en": "Today I still have",
    "de": "Heute habe ich noch",
    "uk": "Сьогодні ще є"
  },
  {
    "es": "¡Hola Matías!",
    "en": "Hi!",
    "de": "Hallo!",
    "uk": "Привіт!"
  },
  {
    "es": "con Sebastián",
    "en": "with Sebastian",
    "de": "bei Sebastian",
    "uk": "у Себастьяна"
  },
  {
    "es": ". Elegí otro.",
    "en": ". Choose another.",
    "de": ". Wähle eine andere Zeit.",
    "uk": ". Оберіть інший час."
  },
  {
    "es": "Corte + barba",
    "en": "Haircut + beard",
    "de": "Haarschnitt + Bart",
    "uk": "Стрижка + борода"
  },
  {
    "es": "Staff sign in",
    "en": "Staff sign in",
    "de": "Mitarbeiter-Anmeldung",
    "uk": "Вхід співробітника"
  },
  {
    "es": "Purchase cost",
    "en": "Purchase cost",
    "de": "Einkaufspreis",
    "uk": "Закупівельна ціна"
  },
  {
    "es": "Stock receipt",
    "en": "Stock receipt",
    "de": "Wareneingang",
    "uk": "Прихід товару"
  },
  {
    "es": "Stock balance",
    "en": "Stock balance",
    "de": "Lagerbestand",
    "uk": "Залишки на складі"
  },
  {
    "es": "Nobody yet. 👌",
    "en": "Nobody yet. 👌",
    "de": "Noch niemand. 👌",
    "uk": "Поки нікого немає. 👌"
  },
  {
    "es": "Barber levels",
    "en": "Barber levels",
    "de": "Barbier-Stufen",
    "uk": "Рівні барберів"
  },
  {
    "es": "Staff members",
    "en": "Staff members",
    "de": "Mitarbeiter",
    "uk": "Співробітники"
  },
  {
    "es": "Staff payroll",
    "en": "Staff payroll",
    "de": "Mitarbeiterabrechnung",
    "uk": "Зарплата співробітників"
  },
  {
    "es": "Pany password",
    "en": "Panel password",
    "de": "Panel-Passwort",
    "uk": "Пароль панелі"
  },
  {
    "es": "Staff sign in",
    "en": "Staff sign in",
    "de": "Mitarbeiter-Anmeldung",
    "uk": "Вхід співробітника"
  },
  {
    "es": "Barber levels",
    "en": "Barber levels",
    "de": "Barbier-Stufen",
    "uk": "Рівні барберів"
  },
  {
    "es": "Stock receipt",
    "en": "Stock receipt",
    "de": "Wareneingang",
    "uk": "Прихід товару"
  },
  {
    "es": "Stock balance",
    "en": "Stock balance",
    "de": "Lagerbestand",
    "uk": "Залишки на складі"
  },
  {
    "es": "Staff payroll",
    "en": "Staff payroll",
    "de": "Mitarbeiterabrechnung",
    "uk": "Зарплата співробітників"
  },
  {
    "es": "Cash movement",
    "en": "Cash movement",
    "de": "Bargeldbewegung",
    "uk": "Рух готівки"
  },
  {
    "es": "Nada por acá.",
    "en": "Nothing here.",
    "de": "Hier ist nichts.",
    "uk": "Тут нічого немає."
  },
  {
    "es": "Día siguiente",
    "en": "Next day",
    "de": "Nächster Tag",
    "uk": "Наступний день"
  },
  {
    "es": "Transferencia",
    "en": "Bank transfer",
    "de": "Überweisung",
    "uk": "Переказ"
  },
  {
    "es": "Edit employee",
    "en": "Edit employee",
    "de": "Mitarbeiter bearbeiten",
    "uk": "Редагувати співробітника"
  },
  {
    "es": "Purchase cost",
    "en": "Purchase cost",
    "de": "Einkaufspreis",
    "uk": "Закупівельна ціна"
  },
  {
    "es": "Stock receipt",
    "en": "Stock receipt",
    "de": "Wareneingang",
    "uk": "Прихід товару"
  },
  {
    "es": "Uncategorized",
    "en": "Uncategorized",
    "de": "Ohne Kategorie",
    "uk": "Без категорії"
  },
  {
    "es": "Staff members",
    "en": "Staff members",
    "de": "Mitarbeiter",
    "uk": "Співробітники"
  },
  {
    "es": "Staff sign in",
    "en": "Staff sign in",
    "de": "Mitarbeiter-Anmeldung",
    "uk": "Вхід співробітника"
  },
  {
    "es": "Staff payroll",
    "en": "Staff payroll",
    "de": "Mitarbeiterabrechnung",
    "uk": "Зарплата співробітників"
  },
  {
    "es": "Junior barber",
    "en": "Junior barber",
    "de": "Junior-Barbier",
    "uk": "Молодший барбер"
  },
  {
    "es": "Senior barber",
    "en": "Senior barber",
    "de": "Senior-Barbier",
    "uk": "Старший барбер"
  },
  {
    "es": "Not specified",
    "en": "Not specified",
    "de": "Nicht festgelegt",
    "uk": "Не визначено"
  },
  {
    "es": "Staff members",
    "en": "Staff members",
    "de": "Mitarbeiter",
    "uk": "Співробітники"
  },
  {
    "es": "Profile photo",
    "en": "Profile photo",
    "de": "Profilfoto",
    "uk": "Фото профілю"
  },
  {
    "es": "Calendar menu",
    "en": "Calendar menu",
    "de": "Kalendermenü",
    "uk": "Меню календаря"
  },
  {
    "es": "Selected date",
    "en": "Selected date",
    "de": "Ausgewähltes Datum",
    "uk": "Обрана дата"
  },
  {
    "es": "Previous date",
    "en": "Previous date",
    "de": "Vorheriger Tag",
    "uk": "Попередня дата"
  },
  {
    "es": "Vales y pagos",
    "en": "Advances and payments",
    "de": "Vorschüsse und Zahlungen",
    "uk": "Аванси та виплати"
  },
  {
    "es": "Administrator",
    "en": "Administrator",
    "de": "Administrator",
    "uk": "Адміністратор"
  },
  {
    "es": "Undo check-in",
    "en": "Undo check-in",
    "de": "Ankunft zurücknehmen",
    "uk": "Скасувати позначку приходу"
  },
  {
    "es": "Sin confirmar",
    "en": "Not confirmed",
    "de": "Nicht bestätigt",
    "uk": "Не підтверджено"
  },
  {
    "es": "Not confirmed",
    "en": "Not confirmed",
    "de": "Nicht bestätigt",
    "uk": "Не підтверджено"
  },
  {
    "es": "Start service",
    "en": "Start service",
    "de": "Behandlung beginnen",
    "uk": "Почати послугу"
  },
  {
    "es": "Junior barber",
    "en": "Junior barber",
    "de": "Junior-Barbier",
    "uk": "Молодший барбер"
  },
  {
    "es": "Senior barber",
    "en": "Senior barber",
    "de": "Senior-Barbier",
    "uk": "Старший барбер"
  },
  {
    "es": "Próximo turno",
    "en": "Next booking",
    "de": "Nächster Termin",
    "uk": "Наступний запис"
  },
  {
    "es": "Agendar turno",
    "en": "Create booking",
    "de": "Termin anlegen",
    "uk": "Створити запис"
  },
  {
    "es": "Cómo se corta",
    "en": "Service notes",
    "de": "Service-Notizen",
    "uk": "Нотатки про послугу"
  },
  {
    "es": "Gasto cargado",
    "en": "Expense added",
    "de": "Ausgabe hinzugefügt",
    "uk": "Витрату додано"
  },
  {
    "es": "Transferencia",
    "en": "Transfer",
    "de": "Überweisung",
    "uk": "Переказ"
  },
  {
    "es": "Profile photo",
    "en": "Profile photo",
    "de": "Profilfoto",
    "uk": "Фото профілю"
  },
  {
    "es": "Select barber",
    "en": "Select barber",
    "de": "Barbier auswählen",
    "uk": "Обрати барбера"
  },
  {
    "es": "Hryvnia (UAH)",
    "en": "Hryvnia (UAH)",
    "de": "Hrywnja (UAH)",
    "uk": "Гривня (UAH)"
  },
  {
    "es": "Save currency",
    "en": "Save currency",
    "de": "Währung speichern",
    "uk": "Зберегти валюту"
  },
  {
    "es": "Día inválido.",
    "en": "Invalid day.",
    "de": "Ungültiger Tag.",
    "uk": "Некоректний день."
  },
  {
    "es": "Buenas tardes",
    "en": "Good afternoon",
    "de": "Guten Tag",
    "uk": "Добрий день"
  },
  {
    "es": "Buenas noches",
    "en": "Good evening",
    "de": "Guten Abend",
    "uk": "Добрий вечір"
  },
  {
    "es": "Mes siguiente",
    "en": "Next month",
    "de": "Nächster Monat",
    "uk": "Наступний місяць"
  },
  {
    "es": "en la bandeja",
    "en": "in the inbox",
    "de": "im Posteingang",
    "uk": "у вхідних"
  },
  {
    "es": "Cliente nuevo",
    "en": "New client",
    "de": "Neuer Kunde",
    "uk": "Новий клієнт"
  },
  {
    "es": "Seña activada",
    "en": "Deposit enabled",
    "de": "Anzahlung aktiviert",
    "uk": "Передоплату увімкнено"
  },
  {
    "es": "Sin conectar.",
    "en": "Not connected.",
    "de": "Nicht verbunden.",
    "uk": "Не підключено."
  },
  {
    "es": "ya es cliente",
    "en": "existing client",
    "de": "bestehender Kunde",
    "uk": "вже клієнт"
  },
  {
    "es": "Turnos fijos",
    "en": "Fixed bookings",
    "de": "Fixtermine",
    "uk": "Постійні записи"
  },
  {
    "es": "Turno rápido",
    "en": "Quick booking",
    "de": "Schnelltermin",
    "uk": "Швидкий запис"
  },
  {
    "es": "Guardar vale",
    "en": "Save advance",
    "de": "Vorschuss speichern",
    "uk": "Зберегти аванс"
  },
  {
    "es": "por atender.",
    "en": "to serve.",
    "de": "zu bedienen.",
    "uk": "до обслуговування."
  },
  {
    "es": "no respondió",
    "en": "did not respond",
    "de": "hat nicht geantwortet",
    "uk": "не відповів"
  },
  {
    "es": "Generar link",
    "en": "Generate link",
    "de": "Link erzeugen",
    "uk": "Створити посилання"
  },
  {
    "es": "en ese lapso",
    "en": "in that period",
    "de": "in diesem Zeitraum",
    "uk": "у цьому періоді"
  },
  {
    "es": "joya gracias",
    "en": "perfect, thanks",
    "de": "perfekt, danke",
    "uk": "супер, дякую"
  },
  {
    "es": ": no atiende",
    "en": ": not working",
    "de": ": nicht im Dienst",
    "uk": ": не працює"
  },
  {
    "es": "con Nehemías",
    "en": "with Nehemias",
    "de": "bei Nehemias",
    "uk": "у Нехеміаса"
  },
  {
    "es": "con Santiago",
    "en": "with Santiago",
    "de": "bei Santiago",
    "uk": "у Сантьяго"
  },
  {
    "es": "joya gracias",
    "en": "Perfect, thanks",
    "de": "Perfekt, danke",
    "uk": "Чудово, дякую"
  },
  {
    "es": "Vale cargado",
    "en": "Advance added",
    "de": "Vorschuss hinzugefügt",
    "uk": "Аванс додано"
  },
  {
    "es": "Historial · ",
    "en": "History · ",
    "de": "Verlauf · ",
    "uk": "Історія · "
  },
  {
    "es": " en cantidad",
    "en": " quantity",
    "de": " Menge",
    "uk": " кількість"
  },
  {
    "es": "el teléfono ",
    "en": "phone ",
    "de": "Telefon ",
    "uk": "телефон "
  },
  {
    "es": "para Booking",
    "en": "for Booking",
    "de": "für Termin",
    "uk": "для Запис"
  },
  {
    "es": "Already paid",
    "en": "Already paid",
    "de": "Bereits ausgezahlt",
    "uk": "Вже виплачено"
  },
  {
    "es": "Staff member",
    "en": "Staff member",
    "de": "Mitarbeiter",
    "uk": "Співробітник"
  },
  {
    "es": "Product name",
    "en": "Product name",
    "de": "Produktname",
    "uk": "Назва товару"
  },
  {
    "es": "Cash deposit",
    "en": "Cash deposit",
    "de": "Bareinlage",
    "uk": "Внесення готівки"
  },
  {
    "es": "Net movement",
    "en": "Net movement",
    "de": "Nettobewegung",
    "uk": "Чистий рух коштів"
  },
  {
    "es": "¿Para quién?",
    "en": "For whom?",
    "de": "Für wen?",
    "uk": "Для кого?"
  },
  {
    "es": "Día anterior",
    "en": "Previous day",
    "de": "Vorheriger Tag",
    "uk": "Попередній день"
  },
  {
    "es": "Próximamente",
    "en": "Upcoming",
    "de": "Bevorstehend",
    "uk": "Незабаром"
  },
  {
    "es": "Turnos fijos",
    "en": "Recurring bookings",
    "de": "Wiederkehrende Termine",
    "uk": "Постійні записи"
  },
  {
    "es": "Staff access",
    "en": "Staff access",
    "de": "Mitarbeiterzugang",
    "uk": "Доступ співробітників"
  },
  {
    "es": "Product name",
    "en": "Product name",
    "de": "Produktname",
    "uk": "Назва товару"
  },
  {
    "es": "Staff access",
    "en": "Staff access",
    "de": "Mitarbeiterzugang",
    "uk": "Доступ співробітників"
  },
  {
    "es": "Sales & cash",
    "en": "Sales & cash",
    "de": "Verkäufe und Kasse",
    "uk": "Продажі та каса"
  },
  {
    "es": "Personalidad",
    "en": "Personality",
    "de": "Persönlichkeit",
    "uk": "Стиль спілкування"
  },
  {
    "es": "Quitar regla",
    "en": "Remove rule",
    "de": "Regel entfernen",
    "uk": "Видалити правило"
  },
  {
    "es": "Transactions",
    "en": "Transactions",
    "de": "Transaktionen",
    "uk": "Операції"
  },
  {
    "es": "Cash counted",
    "en": "Cash counted",
    "de": "Gezähltes Bargeld",
    "uk": "Фактично готівки"
  },
  {
    "es": "Staff access",
    "en": "Staff access",
    "de": "Mitarbeiterzugang",
    "uk": "Доступ співробітників"
  },
  {
    "es": "Staff member",
    "en": "Staff member",
    "de": "Mitarbeiter",
    "uk": "Співробітник"
  },
  {
    "es": "Staff member",
    "en": "Staff member",
    "de": "Mitarbeiter",
    "uk": "Співробітник"
  },
  {
    "es": "Caja cerrada",
    "en": "Cash closed",
    "de": "Kasse geschlossen",
    "uk": "Касу закрито"
  },
  {
    "es": "Ticket prom.",
    "en": "Avg. ticket",
    "de": "Ø Bon",
    "uk": "Сер. чек"
  },
  {
    "es": "Choose photo",
    "en": "Choose photo",
    "de": "Foto auswählen",
    "uk": "Обрати фото"
  },
  {
    "es": "Zona horaria",
    "en": "Time zone",
    "de": "Zeitzone",
    "uk": "Часовий пояс"
  },
  {
    "es": "por servicio",
    "en": "per service",
    "de": "pro Leistung",
    "uk": "за послугу"
  },
  {
    "es": "Mes cerrado.",
    "en": "Closed month.",
    "de": "Abgeschlossener Monat.",
    "uk": "Закритий місяць."
  },
  {
    "es": "Mes anterior",
    "en": "Previous month",
    "de": "Vorheriger Monat",
    "uk": "Попередній місяць"
  },
  {
    "es": "Por servicio",
    "en": "By service",
    "de": "Nach Leistung",
    "uk": "За послугою"
  },
  {
    "es": "Cobro rápido",
    "en": "Quick checkout",
    "de": "Schnellkasse",
    "uk": "Швидка оплата"
  },
  {
    "es": "este cliente",
    "en": "this client",
    "de": "dieser Kunde",
    "uk": "цей клієнт"
  },
  {
    "es": "Hoy entraron",
    "en": "Received today",
    "de": "Heute eingegangen",
    "uk": "Сьогодні надійшло"
  },
  {
    "es": "Propina para",
    "en": "Tip for",
    "de": "Trinkgeld für",
    "uk": "Чайові для"
  },
  {
    "es": "Cargar gasto",
    "en": "Add expense",
    "de": "Ausgabe hinzufügen",
    "uk": "Додати витрату"
  },
  {
    "es": "Anotar turno",
    "en": "Create booking",
    "de": "Termin anlegen",
    "uk": "Створити запис"
  },
  {
    "es": "Nuevo turno",
    "en": "New booking",
    "de": "Neuer Termin",
    "uk": "Новий запис"
  },
  {
    "es": "un solo día",
    "en": "one day only",
    "de": "nur einmal",
    "uk": "один день"
  },
  {
    "es": "Horario con",
    "en": "Time with",
    "de": "Zeit mit",
    "uk": "Час із"
  },
  {
    "es": "son retiros",
    "en": "are withdrawals",
    "de": "sind Entnahmen",
    "uk": "є вилученнями"
  },
  {
    "es": "Día por día",
    "en": "Day by day",
    "de": "Tag für Tag",
    "uk": "За днями"
  },
  {
    "es": "Un momento…",
    "en": "One moment…",
    "de": "Einen Moment…",
    "uk": "Хвилинку…"
  },
  {
    "es": "18 con nehe",
    "en": "18:00 works",
    "de": "18:00 passt",
    "uk": "18:00 підходить"
  },
  {
    "es": "Esta semana",
    "en": "This week",
    "de": "Diese Woche",
    "uk": "Цей тиждень"
  },
  {
    "es": " restantes)",
    "en": " remaining)",
    "de": " übrig)",
    "uk": " залишилось)"
  },
  {
    "es": "Horario de ",
    "en": "Schedule for ",
    "de": "Arbeitszeit von ",
    "uk": "Графік "
  },
  {
    "es": "a las 18:00",
    "en": "at 18:00",
    "de": "um 18:00",
    "uk": "о 18:00"
  },
  {
    "es": " caracteres",
    "en": " characters",
    "de": " Zeichen",
    "uk": " символів"
  },
  {
    "es": "Signing in…",
    "en": "Signing in…",
    "de": "Anmeldung…",
    "uk": "Вхід…"
  },
  {
    "es": "My schedule",
    "en": "My schedule",
    "de": "Mein Dienstplan",
    "uk": "Мій графік"
  },
  {
    "es": "New product",
    "en": "New product",
    "de": "Neues Produkt",
    "uk": "Новий товар"
  },
  {
    "es": "Add product",
    "en": "Add product",
    "de": "Produkt hinzufügen",
    "uk": "Додати товар"
  },
  {
    "es": "No one yet.",
    "en": "No one yet.",
    "de": "Noch niemand.",
    "uk": "Поки нікого немає."
  },
  {
    "es": "Entrando...",
    "en": "Signing in...",
    "de": "Anmeldung...",
    "uk": "Вхід..."
  },
  {
    "es": "New product",
    "en": "New product",
    "de": "Neues Produkt",
    "uk": "Новий товар"
  },
  {
    "es": "Add product",
    "en": "Add product",
    "de": "Produkt hinzufügen",
    "uk": "Додати товар"
  },
  {
    "es": "Descripción",
    "en": "Description",
    "de": "Beschreibung",
    "uk": "Опис"
  },
  {
    "es": "Crear turno",
    "en": "Create appointment",
    "de": "Termin erstellen",
    "uk": "Створити запис"
  },
  {
    "es": "Add product",
    "en": "Add product",
    "de": "Produkt hinzufügen",
    "uk": "Додати товар"
  },
  {
    "es": "Signing in…",
    "en": "Signing in…",
    "de": "Anmeldung…",
    "uk": "Вхід…"
  },
  {
    "es": "My schedule",
    "en": "My schedule",
    "de": "Mein Dienstplan",
    "uk": "Мій графік"
  },
  {
    "es": "Client name",
    "en": "Client name",
    "de": "Kundenname",
    "uk": "Ім'я клієнта"
  },
  {
    "es": "Not allowed",
    "en": "Not allowed",
    "de": "Nicht erlaubt",
    "uk": "Заборонено"
  },
  {
    "es": "Photo saved",
    "en": "Photo saved",
    "de": "Foto gespeichert",
    "uk": "Фото збережено"
  },
  {
    "es": "New booking",
    "en": "New booking",
    "de": "Neuer Termin",
    "uk": "Новий запис"
  },
  {
    "es": "In progress",
    "en": "In progress",
    "de": "In Bearbeitung",
    "uk": "У процесі"
  },
  {
    "es": "Apply dates",
    "en": "Apply dates",
    "de": "Zeitraum anwenden",
    "uk": "Застосувати дати"
  },
  {
    "es": "In progress",
    "en": "In progress",
    "de": "In Bearbeitung",
    "uk": "У процесі"
  },
  {
    "es": "New booking",
    "en": "New booking",
    "de": "Neuer Termin",
    "uk": "Новий запис"
  },
  {
    "es": "Caja de hoy",
    "en": "Today's cash",
    "de": "Heutige Kasse",
    "uk": "Каса за сьогодні"
  },
  {
    "es": "Por barbero",
    "en": "By staff member",
    "de": "Nach Mitarbeiter",
    "uk": "За майстрами"
  },
  {
    "es": "No vinieron",
    "en": "No-shows",
    "de": "Nicht erschienen",
    "uk": "Не прийшли"
  },
  {
    "es": "Respondo yo",
    "en": "I respond",
    "de": "Ich antworte",
    "uk": "Відповідаю я"
  },
  {
    "es": "Apply dates",
    "en": "Apply dates",
    "de": "Zeitraum anwenden",
    "uk": "Застосувати дати"
  },
  {
    "es": "Photo saved",
    "en": "Photo saved",
    "de": "Foto gespeichert",
    "uk": "Фото збережено"
  },
  {
    "es": "Profesional",
    "en": "Professional",
    "de": "Professionell",
    "uk": "Професійний"
  },
  {
    "es": "Un solo día",
    "en": "One day only",
    "de": "Nur einmal",
    "uk": "Один день"
  },
  {
    "es": "Reservá acá",
    "en": "Book here",
    "de": "Hier buchen",
    "uk": "Записатися тут"
  },
  {
    "es": "Cerrar caja",
    "en": "Close cash",
    "de": "Kasse schließen",
    "uk": "Закрити касу"
  },
  {
    "es": "Cargar vale",
    "en": "Add advance",
    "de": "Vorschuss erfassen",
    "uk": "Додати аванс"
  },
  {
    "es": "Cuánto dura",
    "en": "Duration",
    "de": "Dauer",
    "uk": "Тривалість"
  },
  {
    "es": "Hora de hoy",
    "en": "Time today",
    "de": "Uhrzeit heute",
    "uk": "Час сьогодні"
  },
  {
    "es": "Barbershop",
    "en": "Appointments",
    "de": "Termine",
    "uk": "Записи"
  },
  {
    "es": "Automático",
    "en": "Automation",
    "de": "Automatisierung",
    "uk": "Автоматизація"
  },
  {
    "es": "Conexiones",
    "en": "Connections",
    "de": "Verbindungen",
    "uk": "Підключення"
  },
  {
    "es": "Turno fijo",
    "en": "Fixed booking",
    "de": "Fixtermin",
    "uk": "Постійний запис"
  },
  {
    "es": "Guardando…",
    "en": "Saving…",
    "de": "Speichern…",
    "uk": "Збереження…"
  },
  {
    "es": "Cargala en",
    "en": "Add it to",
    "de": "In",
    "uk": "Додайте в"
  },
  {
    "es": "vía Zernio",
    "en": "via Zernio",
    "de": "über Zernio",
    "uk": "через Zernio"
  },
  {
    "es": "en 45 días",
    "en": "in 45 days",
    "de": "in 45 Tagen",
    "uk": "за 45 днів"
  },
  {
    "es": " servicios",
    "en": " services",
    "de": " Leistungen",
    "uk": " послуги"
  },
  {
    "es": "Servicios ",
    "en": "Services ",
    "de": "Leistungen ",
    "uk": "Послуги "
  },
  {
    "es": "History · ",
    "en": "History · ",
    "de": "Verlauf · ",
    "uk": "Історія · "
  },
  {
    "es": "Commission",
    "en": "Commission",
    "de": "Provision",
    "uk": "Комісія"
  },
  {
    "es": "Sale price",
    "en": "Sale price",
    "de": "Verkaufspreis",
    "uk": "Ціна продажу"
  },
  {
    "es": "Configurar",
    "en": "Configure",
    "de": "Konfigurieren",
    "uk": "Налаштувати"
  },
  {
    "es": "Conexiones",
    "en": "Connections",
    "de": "Verbindungen",
    "uk": "Підключення"
  },
  {
    "es": "Día pasado",
    "en": "Past day",
    "de": "Vergangener Tag",
    "uk": "Минулий день"
  },
  {
    "es": "Ver agenda",
    "en": "View schedule",
    "de": "Kalender ansehen",
    "uk": "Переглянути календар"
  },
  {
    "es": "Confirmado",
    "en": "Confirmed",
    "de": "Bestätigt",
    "uk": "Підтверджено"
  },
  {
    "es": "Guardando…",
    "en": "Saving…",
    "de": "Speichern…",
    "uk": "Збереження…"
  },
  {
    "es": "No trabaja",
    "en": "Day off",
    "de": "Arbeitsfrei",
    "uk": "Не працює"
  },
  {
    "es": "Conexiones",
    "en": "Connections",
    "de": "Verbindungen",
    "uk": "Підключення"
  },
  {
    "es": "Inventario",
    "en": "Inventory",
    "de": "Warenlager",
    "uk": "Склад"
  },
  {
    "es": "Categories",
    "en": "Categories",
    "de": "Kategorien",
    "uk": "Категорії"
  },
  {
    "es": "Sale price",
    "en": "Sale price",
    "de": "Verkaufspreis",
    "uk": "Ціна продажу"
  },
  {
    "es": "Commission",
    "en": "Commission",
    "de": "Provision",
    "uk": "Комісія"
  },
  {
    "es": "One barber",
    "en": "One barber",
    "de": "Ein Barbier",
    "uk": "Один барбер"
  },
  {
    "es": "Select day",
    "en": "Select day",
    "de": "Tag auswählen",
    "uk": "Виберіть день"
  },
  {
    "es": "Facturaron",
    "en": "Revenue generated",
    "de": "Erzielter Umsatz",
    "uk": "Отримана виручка"
  },
  {
    "es": "La jornada",
    "en": "Today's schedule",
    "de": "Heutiger Tagesplan",
    "uk": "Графік на сьогодні"
  },
  {
    "es": "Lo atiende",
    "en": "Assigned to",
    "de": "Wird betreut von",
    "uk": "Обслуговує"
  },
  {
    "es": "Close menu",
    "en": "Close menu",
    "de": "Menü schließen",
    "uk": "Закрити меню"
  },
  {
    "es": "Frecuentes",
    "en": "Regular clients",
    "de": "Stammkunden",
    "uk": "Постійні клієнти"
  },
  {
    "es": "Management",
    "en": "Management",
    "de": "Verwaltung",
    "uk": "Керування"
  },
  {
    "es": "Other time",
    "en": "Other time",
    "de": "Andere Uhrzeit",
    "uk": "Інший час"
  },
  {
    "es": "One barber",
    "en": "One barber",
    "de": "Ein Barbier",
    "uk": "Один барбер"
  },
  {
    "es": "commission",
    "en": "commission",
    "de": "Provision",
    "uk": "комісії"
  },
  {
    "es": "0 bookings",
    "en": "0 bookings",
    "de": "0 Termine",
    "uk": "0 записів"
  },
  {
    "es": "Por cobrar",
    "en": "To collect",
    "de": "Offen",
    "uk": "До оплати"
  },
  {
    "es": "Publicidad",
    "en": "Marketing",
    "de": "Marketing",
    "uk": "Маркетинг"
  },
  {
    "es": "Configurar",
    "en": "Configure",
    "de": "Konfigurieren",
    "uk": "Налаштувати"
  },
  {
    "es": "Euro (EUR)",
    "en": "Euro (EUR)",
    "de": "Euro (EUR)",
    "uk": "Євро (EUR)"
  },
  {
    "es": "Invite key",
    "en": "Invite key",
    "de": "Einladungscode",
    "uk": "Ключ-запрошення"
  },
  {
    "es": "de propina",
    "en": "in tips",
    "de": "Trinkgeld",
    "uk": "чайових"
  },
  {
    "es": "facturaron",
    "en": "generated",
    "de": "erstellte Termine erzielten",
    "uk": "принесли"
  },
  {
    "es": "Semana del",
    "en": "Week of",
    "de": "Woche vom",
    "uk": "Тиждень від"
  },
  {
    "es": "Cuándo fue",
    "en": "When it happened",
    "de": "Wann war es",
    "uk": "Коли було"
  },
  {
    "es": "Día a día",
    "en": "Daily",
    "de": "Täglich",
    "uk": "Щодня"
  },
  {
    "es": "Agente IA",
    "en": "AI Agent",
    "de": "KI-Assistent",
    "uk": "AI-асистент"
  },
  {
    "es": "Secciones",
    "en": "Sections",
    "de": "Bereiche",
    "uk": "Розділи"
  },
  {
    "es": "Servicios",
    "en": "Services",
    "de": "Leistungen",
    "uk": "Послуги"
  },
  {
    "es": "Siguiente",
    "en": "Next",
    "de": "Weiter",
    "uk": "Далі"
  },
  {
    "es": "Continuar",
    "en": "Continue",
    "de": "Weiter",
    "uk": "Продовжити"
  },
  {
    "es": "Confirmar",
    "en": "Confirm",
    "de": "Bestätigen",
    "uk": "Підтвердити"
  },
  {
    "es": "Barbero ·",
    "en": "Staff member ·",
    "de": "Mitarbeiter ·",
    "uk": "Майстер ·"
  },
  {
    "es": "Con quién",
    "en": "With whom",
    "de": "Bei wem",
    "uk": "До кого"
  },
  {
    "es": "ya pagada",
    "en": "already paid",
    "de": "bereits bezahlt",
    "uk": "вже сплачено"
  },
  {
    "es": "Luz y gas",
    "en": "Electricity and gas",
    "de": "Strom und Gas",
    "uk": "Електроенергія та газ"
  },
  {
    "es": " barberos",
    "en": " staff members",
    "de": " Mitarbeiter",
    "uk": " майстри"
  },
  {
    "es": "Barberos ",
    "en": "Staff ",
    "de": "Mitarbeiter ",
    "uk": "Майстри "
  },
  {
    "es": " clientes",
    "en": " clients",
    "de": " Kunden",
    "uk": " клієнти"
  },
  {
    "es": "Clientes ",
    "en": "Clients ",
    "de": "Kunden ",
    "uk": "Клієнти "
  },
  {
    "es": " servicio",
    "en": " service",
    "de": " Leistung",
    "uk": " послугу"
  },
  {
    "es": "Servicio ",
    "en": "Service ",
    "de": "Leistung ",
    "uk": "Послуга "
  },
  {
    "es": " propinas",
    "en": " tips",
    "de": " Trinkgeld",
    "uk": " чайові"
  },
  {
    "es": "Propinas ",
    "en": "Tips ",
    "de": "Trinkgeld ",
    "uk": "Чайові "
  },
  {
    "es": "¡De nada!",
    "en": "You're welcome!",
    "de": "Gern!",
    "uk": "Будь ласка!"
  },
  {
    "es": "ok espero",
    "en": "okay, I'll wait",
    "de": "okay, ich warte",
    "uk": "добре, чекатиму"
  },
  {
    "es": "Mar a Sáb",
    "en": "Tue to Sat",
    "de": "Di bis Sa",
    "uk": "Вт–Сб"
  },
  {
    "es": " guardado",
    "en": " saved",
    "de": " gespeichert",
    "uk": " збережено"
  },
  {
    "es": "Corte de ",
    "en": "Break from ",
    "de": "Pause von ",
    "uk": "Перерва з "
  },
  {
    "es": "miércoles",
    "en": "Wednesday",
    "de": "Mittwoch",
    "uk": "середа"
  },
  {
    "es": "Te faltan",
    "en": "You need",
    "de": "Dir fehlen",
    "uk": "Залишилося"
  },
  {
    "es": "se cargó ",
    "en": "was loaded ",
    "de": "wurde geladen ",
    "uk": "завантажено "
  },
  {
    "es": "Time zone",
    "en": "Time zone",
    "de": "Zeitzone",
    "uk": "Часовий пояс"
  },
  {
    "es": "Yesterday",
    "en": "Yesterday",
    "de": "Gestern",
    "uk": "Вчора"
  },
  {
    "es": "Wednesday",
    "en": "Wednesday",
    "de": "Mittwoch",
    "uk": "середа"
  },
  {
    "es": "September",
    "en": "September",
    "de": "September",
    "uk": "Вересень"
  },
  {
    "es": "Full name",
    "en": "Full name",
    "de": "Vor- und Nachname",
    "uk": "Ім’я та прізвище"
  },
  {
    "es": "Inventory",
    "en": "Inventory",
    "de": "Warenlager",
    "uk": "Склад"
  },
  {
    "es": "Low stock",
    "en": "Low stock",
    "de": "Niedriger Bestand",
    "uk": "Малий залишок"
  },
  {
    "es": "Write-off",
    "en": "Write-off",
    "de": "Abschreibung",
    "uk": "Списання"
  },
  {
    "es": "Write-off",
    "en": "Write-off",
    "de": "Abschreibung",
    "uk": "Списання"
  },
  {
    "es": "miércoles",
    "en": "Wednesday",
    "de": "Mittwoch",
    "uk": "середа"
  },
  {
    "es": "Cancelado",
    "en": "Cancelled",
    "de": "Abgesagt",
    "uk": "Скасовано"
  },
  {
    "es": "Confirmar",
    "en": "Confirm",
    "de": "Bestätigen",
    "uk": "Підтвердити"
  },
  {
    "es": "that day.",
    "en": "on that day.",
    "de": "an diesem Tag.",
    "uk": "на цей день."
  },
  {
    "es": "Cargando…",
    "en": "Loading…",
    "de": "Laden…",
    "uk": "Завантаження…"
  },
  {
    "es": "Inventory",
    "en": "Inventory",
    "de": "Warenlager",
    "uk": "Склад"
  },
  {
    "es": "Low stock",
    "en": "Low stock",
    "de": "Niedriger Bestand",
    "uk": "Малий залишок"
  },
  {
    "es": "Operation",
    "en": "Operation",
    "de": "Vorgang",
    "uk": "Операція"
  },
  {
    "es": "Next date",
    "en": "Next date",
    "de": "Nächster Tag",
    "uk": "Наступна дата"
  },
  {
    "es": "Confirmed",
    "en": "Confirmed",
    "de": "Bestätigt",
    "uk": "Підтверджено"
  },
  {
    "es": "Completed",
    "en": "Completed",
    "de": "Abgeschlossen",
    "uk": "Завершено"
  },
  {
    "es": "Cancelled",
    "en": "Cancelled",
    "de": "Abgesagt",
    "uk": "Скасовано"
  },
  {
    "es": "· pausado",
    "en": "· paused",
    "de": "· pausiert",
    "uk": "· призупинено"
  },
  {
    "es": "Hair care",
    "en": "Hair care",
    "de": "Haarpflege",
    "uk": "Догляд за волоссям"
  },
  {
    "es": "Instagram",
    "en": "Instagram",
    "de": "Instagram",
    "uk": "Instagram"
  },
  {
    "es": "available",
    "en": "Available",
    "de": "Frei",
    "uk": "Вільний"
  },
  {
    "es": "scheduled",
    "en": "scheduled",
    "de": "eingetragen",
    "uk": "заплановано"
  },
  {
    "es": "Otra hora",
    "en": "Other time",
    "de": "Andere Uhrzeit",
    "uk": "Інший час"
  },
  {
    "es": "Confirmed",
    "en": "Confirmed",
    "de": "Bestätigt",
    "uk": "Підтверджено"
  },
  {
    "es": "available",
    "en": "Available",
    "de": "Frei",
    "uk": "Вільний"
  },
  {
    "es": "Cancelado",
    "en": "Cancelled",
    "de": "Abgesagt",
    "uk": "Скасовано"
  },
  {
    "es": "Cancelled",
    "en": "Cancelled",
    "de": "Abgesagt",
    "uk": "Скасовано"
  },
  {
    "es": "Employees",
    "en": "Employees",
    "de": "Mitarbeitende",
    "uk": "Співробітники"
  },
  {
    "es": "AI model:",
    "en": "AI model:",
    "de": "KI-Modell:",
    "uk": "Модель ШІ:"
  },
  {
    "es": "1 booking",
    "en": "1 booking",
    "de": "1 Termin",
    "uk": "1 запис"
  },
  {
    "es": "1 booking",
    "en": "1 booking",
    "de": "1 Termin",
    "uk": "1 запис"
  },
  {
    "es": "1 service",
    "en": "1 service",
    "de": "1 Leistung",
    "uk": "1 послуга"
  },
  {
    "es": "Fidelidad",
    "en": "Loyalty",
    "de": "Treue",
    "uk": "Лояльність"
  },
  {
    "es": "Frecuente",
    "en": "Regular",
    "de": "Stammkunde",
    "uk": "Постійний"
  },
  {
    "es": "En riesgo",
    "en": "At risk",
    "de": "Gefährdet",
    "uk": "Під ризиком"
  },
  {
    "es": "Ocasional",
    "en": "Occasional",
    "de": "Gelegentlich",
    "uk": "Час від часу"
  },
  {
    "es": "Resultado",
    "en": "Net result",
    "de": "Ergebnis",
    "uk": "Результат"
  },
  {
    "es": "Atendidos",
    "en": "Completed",
    "de": "Abgeschlossen",
    "uk": "Завершено"
  },
  {
    "es": "Ocupación",
    "en": "Occupancy",
    "de": "Auslastung",
    "uk": "Завантаженість"
  },
  {
    "es": "Dirección",
    "en": "Address",
    "de": "Adresse",
    "uk": "Адреса"
  },
  {
    "es": "1 payment",
    "en": "1 payment",
    "de": "1 Zahlung",
    "uk": "1 оплата"
  },
  {
    "es": "Configure",
    "en": "Configure",
    "de": "Konfigurieren",
    "uk": "Налаштувати"
  },
  {
    "es": "Analytics",
    "en": "Analytics",
    "de": "Analysen",
    "uk": "Аналітика"
  },
  {
    "es": "Creating…",
    "en": "Creating…",
    "de": "Wird erstellt…",
    "uk": "Створення…"
  },
  {
    "es": "Copy link",
    "en": "Copy link",
    "de": "Link kopieren",
    "uk": "Скопіювати посилання"
  },
  {
    "es": "agente IA",
    "en": "AI Agent",
    "de": "KI-Assistent",
    "uk": "AI-асистент"
  },
  {
    "es": "Aplicado.",
    "en": "Applied.",
    "de": "Angewendet.",
    "uk": "Застосовано."
  },
  {
    "es": "Sin turno",
    "en": "Walk-in",
    "de": "Ohne Termin",
    "uk": "Без запису"
  },
  {
    "es": "Anotando…",
    "en": "Creating…",
    "de": "Wird erstellt…",
    "uk": "Створення…"
  },
  {
    "es": "Clientes",
    "en": "Clients",
    "de": "Kunden",
    "uk": "Клієнти"
  },
  {
    "es": "Finanzas",
    "en": "Finance",
    "de": "Finanzen",
    "uk": "Фінанси"
  },
  {
    "es": "Servicio",
    "en": "Service",
    "de": "Leistung",
    "uk": "Послуга"
  },
  {
    "es": "Eliminar",
    "en": "Delete",
    "de": "Löschen",
    "uk": "Видалити"
  },
  {
    "es": "Cancelar",
    "en": "Cancel",
    "de": "Abbrechen",
    "uk": "Скасувати"
  },
  {
    "es": "ya tiene",
    "en": "already has",
    "de": "hat bereits",
    "uk": "вже має"
  },
  {
    "es": "Este mes",
    "en": "This month",
    "de": "Dieser Monat",
    "uk": "Цей місяць"
  },
  {
    "es": " barbero",
    "en": " staff member",
    "de": " Mitarbeiter",
    "uk": " майстер"
  },
  {
    "es": "Barbero ",
    "en": "Staff member ",
    "de": "Mitarbeiter ",
    "uk": "Майстер "
  },
  {
    "es": " cliente",
    "en": " client",
    "de": " Kunde",
    "uk": " клієнт"
  },
  {
    "es": "Cliente ",
    "en": "Client ",
    "de": "Kunde ",
    "uk": "Клієнт "
  },
  {
    "es": " propina",
    "en": " tip",
    "de": " Trinkgeld",
    "uk": " чайові"
  },
  {
    "es": "Propina ",
    "en": "Tip ",
    "de": "Trinkgeld ",
    "uk": "Чайові "
  },
  {
    "es": "Listo ✂️",
    "en": "Done ✂️",
    "de": "Fertig ✂️",
    "uk": "Готово ✂️"
  },
  {
    "es": "si porfa",
    "en": "yes please",
    "de": "ja bitte",
    "uk": "так, будь ласка"
  },
  {
    "es": " · ahora",
    "en": " · now",
    "de": " · jetzt",
    "uk": " · зараз"
  },
  {
    "es": "Derivó a",
    "en": "Handed off",
    "de": "Übergeben:",
    "uk": "Передано:"
  },
  {
    "es": "si porfa",
    "en": "Yes please",
    "de": "Ja bitte",
    "uk": "Так, будь ласка"
  },
  {
    "es": "Services",
    "en": "Services",
    "de": "Leistungen",
    "uk": "Послуги"
  },
  {
    "es": "Advances",
    "en": "Advances",
    "de": "Vorschüsse",
    "uk": "Аванси"
  },
  {
    "es": "Tomorrow",
    "en": "Tomorrow",
    "de": "Morgen",
    "uk": "Завтра"
  },
  {
    "es": "Thursday",
    "en": "Thursday",
    "de": "Donnerstag",
    "uk": "четвер"
  },
  {
    "es": "Saturday",
    "en": "Saturday",
    "de": "Samstag",
    "uk": "субота"
  },
  {
    "es": "February",
    "en": "February",
    "de": "Februar",
    "uk": "Лютий"
  },
  {
    "es": "November",
    "en": "November",
    "de": "November",
    "uk": "Листопад"
  },
  {
    "es": "December",
    "en": "December",
    "de": "Dezember",
    "uk": "Грудень"
  },
  {
    "es": "Username",
    "en": "Username",
    "de": "Benutzername",
    "uk": "Ім’я користувача"
  },
  {
    "es": "Password",
    "en": "Password",
    "de": "Passwort",
    "uk": "Пароль"
  },
  {
    "es": "Category",
    "en": "Category",
    "de": "Kategorie",
    "uk": "Категорія"
  },
  {
    "es": "Sign out",
    "en": "Sign out",
    "de": "Abmelden",
    "uk": "Вийти"
  },
  {
    "es": "Username",
    "en": "Username",
    "de": "Benutzername",
    "uk": "Ім’я користувача"
  },
  {
    "es": "Password",
    "en": "Password",
    "de": "Passwort",
    "uk": "Пароль"
  },
  {
    "es": "Teléfono",
    "en": "Phone",
    "de": "Telefon",
    "uk": "Телефон"
  },
  {
    "es": "Duración",
    "en": "Duration",
    "de": "Dauer",
    "uk": "Тривалість"
  },
  {
    "es": "Barberos",
    "en": "Staff",
    "de": "Mitarbeiter",
    "uk": "Майстри"
  },
  {
    "es": "Próximos",
    "en": "Upcoming",
    "de": "Bevorstehend",
    "uk": "Незабаром"
  },
  {
    "es": "Servicio",
    "en": "Service",
    "de": "Leistung",
    "uk": "Послуга"
  },
  {
    "es": "Efectivo",
    "en": "Cash",
    "de": "Kasse",
    "uk": "Каса"
  },
  {
    "es": "Reservas",
    "en": "Bookings",
    "de": "Buchungen",
    "uk": "Записи"
  },
  {
    "es": "Ingresos",
    "en": "Revenue",
    "de": "Umsatz",
    "uk": "Дохід"
  },
  {
    "es": "Products",
    "en": "Products",
    "de": "Produkte",
    "uk": "Товари"
  },
  {
    "es": "Category",
    "en": "Category",
    "de": "Kategorie",
    "uk": "Категорія"
  },
  {
    "es": "Quantity",
    "en": "Quantity",
    "de": "Menge",
    "uk": "Кількість"
  },
  {
    "es": "in stock",
    "en": "in stock",
    "de": "auf Lager",
    "uk": "у наявності"
  },
  {
    "es": "Disabled",
    "en": "Disabled",
    "de": "Deaktiviert",
    "uk": "Вимкнено"
  },
  {
    "es": "Sign out",
    "en": "Sign out",
    "de": "Abmelden",
    "uk": "Вийти"
  },
  {
    "es": "Services",
    "en": "Services",
    "de": "Leistungen",
    "uk": "Послуги"
  },
  {
    "es": "Advances",
    "en": "Advances",
    "de": "Vorschüsse",
    "uk": "Аванси"
  },
  {
    "es": "bookings",
    "en": "bookings",
    "de": "Termine",
    "uk": "записів"
  },
  {
    "es": "Calendar",
    "en": "Calendar",
    "de": "Kalender",
    "uk": "Календар"
  },
  {
    "es": "Tomorrow",
    "en": "Tomorrow",
    "de": "Morgen",
    "uk": "Завтра"
  },
  {
    "es": "Next day",
    "en": "Next day",
    "de": "Nächster Tag",
    "uk": "Наступний день"
  },
  {
    "es": "Products",
    "en": "Products",
    "de": "Produkte",
    "uk": "Товари"
  },
  {
    "es": "Services",
    "en": "Services",
    "de": "Leistungen",
    "uk": "Послуги"
  },
  {
    "es": "Settings",
    "en": "Settings",
    "de": "Einstellungen",
    "uk": "Налаштування"
  },
  {
    "es": "bookings",
    "en": "bookings",
    "de": "Termine",
    "uk": "записів"
  },
  {
    "es": "Ej. 5000",
    "en": "e.g. 5000",
    "de": "z. B. 5000",
    "uk": "Наприклад, 5000"
  },
  {
    "es": "Overview",
    "en": "Overview",
    "de": "Übersicht",
    "uk": "Огляд"
  },
  {
    "es": "Security",
    "en": "Security",
    "de": "Sicherheit",
    "uk": "Безпека"
  },
  {
    "es": "Progress",
    "en": "Progress",
    "de": "Fortschritt",
    "uk": "Прогрес"
  },
  {
    "es": "Sin leer",
    "en": "Unread",
    "de": "Ungelesen",
    "uk": "Непрочитані"
  },
  {
    "es": "Salaries",
    "en": "Salaries",
    "de": "Gehälter",
    "uk": "Зарплати"
  },
  {
    "es": "Atendido",
    "en": "Served",
    "de": "Abgeschlossen",
    "uk": "Завершено"
  },
  {
    "es": "En curso",
    "en": "In progress",
    "de": "In Bearbeitung",
    "uk": "У процесі"
  },
  {
    "es": "bookings",
    "en": "bookings",
    "de": "Termine",
    "uk": "записів"
  },
  {
    "es": "services",
    "en": "services",
    "de": "Leistungen",
    "uk": "послуг"
  },
  {
    "es": "1 client",
    "en": "1 client",
    "de": "1 Kunde",
    "uk": "1 клієнт"
  },
  {
    "es": "Ingresos",
    "en": "Revenue",
    "de": "Umsatz",
    "uk": "Дохід"
  },
  {
    "es": "Propinas",
    "en": "Tips",
    "de": "Trinkgeld",
    "uk": "Чайові"
  },
  {
    "es": "Efectivo",
    "en": "Cash",
    "de": "Kasse",
    "uk": "Каса"
  },
  {
    "es": "Alquiler",
    "en": "Rent",
    "de": "Miete",
    "uk": "Оренда"
  },
  {
    "es": "payments",
    "en": "payments",
    "de": "Zahlungen",
    "uk": "оплати"
  },
  {
    "es": "Canchero",
    "en": "Casual",
    "de": "Locker",
    "uk": "Неформальний"
  },
  {
    "es": "El local",
    "en": "Business",
    "de": "Betrieb",
    "uk": "Заклад"
  },
  {
    "es": "Comisión",
    "en": "Commission",
    "de": "Provision",
    "uk": "Комісія"
  },
  {
    "es": "Buen día",
    "en": "Good morning",
    "de": "Guten Morgen",
    "uk": "Доброго ранку"
  },
  {
    "es": "este mes",
    "en": "this month",
    "de": "diesen Monat",
    "uk": "цього місяця"
  },
  {
    "es": "Conexión",
    "en": "Connection",
    "de": "Verbindung",
    "uk": "Підключення"
  },
  {
    "es": "con seña",
    "en": "with deposit",
    "de": "mit Anzahlung",
    "uk": "з передоплатою"
  },
  {
    "es": "En línea",
    "en": "Online",
    "de": "Online",
    "uk": "Онлайн"
  },
  {
    "es": "Bandeja",
    "en": "Inbox",
    "de": "Posteingang",
    "uk": "Вхідні"
  },
  {
    "es": "Cliente",
    "en": "Client",
    "de": "Kunde",
    "uk": "Клієнт"
  },
  {
    "es": "Ajustes",
    "en": "Settings",
    "de": "Einstellungen",
    "uk": "Налаштування"
  },
  {
    "es": "Guardar",
    "en": "Save",
    "de": "Speichern",
    "uk": "Зберегти"
  },
  {
    "es": "propina",
    "en": "tip",
    "de": "Trinkgeld",
    "uk": "чайові"
  },
  {
    "es": "cargado",
    "en": "scheduled",
    "de": "eingetragen",
    "uk": "заплановано"
  },
  {
    "es": "Hoy, de",
    "en": "Today, from",
    "de": "Heute ab",
    "uk": "Сьогодні з"
  },
  {
    "es": "por día",
    "en": "per day",
    "de": "pro Tag",
    "uk": "за день"
  },
  {
    "es": "Facturó",
    "en": "Revenue",
    "de": "Umsatz",
    "uk": "Дохід"
  },
  {
    "es": " turnos",
    "en": " bookings",
    "de": " Termine",
    "uk": " записи"
  },
  {
    "es": "Turnos ",
    "en": "Bookings ",
    "de": "Termine ",
    "uk": "Записи "
  },
  {
    "es": " mañana",
    "en": " tomorrow",
    "de": " morgen",
    "uk": " завтра"
  },
  {
    "es": "Mañana ",
    "en": "Tomorrow ",
    "de": "Morgen ",
    "uk": "Завтра "
  },
  {
    "es": "Agendó ",
    "en": "Created booking: ",
    "de": "Termin erstellt: ",
    "uk": "Створено запис: "
  },
  {
    "es": "cerrado",
    "en": "closed",
    "de": "geschlossen",
    "uk": "зачинено"
  },
  {
    "es": "Cerrado",
    "en": "Closed",
    "de": "Geschlossen",
    "uk": "Зачинено"
  },
  {
    "es": "Corte 6",
    "en": "Visit 6",
    "de": "Besuch 6",
    "uk": "Візит 6"
  },
  {
    "es": "domingo",
    "en": "Sunday",
    "de": "Sonntag",
    "uk": "неділя"
  },
  {
    "es": "viernes",
    "en": "Friday",
    "de": "Freitag",
    "uk": "п’ятниця"
  },
  {
    "es": "History",
    "en": "History",
    "de": "Verlauf",
    "uk": "Історія"
  },
  {
    "es": "Booking",
    "en": "Booking",
    "de": "Termin",
    "uk": "Запис"
  },
  {
    "es": "mínimo ",
    "en": "minimum ",
    "de": "mindestens ",
    "uk": "мінімум "
  },
  {
    "es": "profile",
    "en": "profile",
    "de": "Profil",
    "uk": "профіль"
  },
  {
    "es": "Revenue",
    "en": "Revenue",
    "de": "Umsatz",
    "uk": "Дохід"
  },
  {
    "es": "Tuesday",
    "en": "Tuesday",
    "de": "Dienstag",
    "uk": "вівторок"
  },
  {
    "es": "January",
    "en": "January",
    "de": "Januar",
    "uk": "Січень"
  },
  {
    "es": "October",
    "en": "October",
    "de": "Oktober",
    "uk": "Жовтень"
  },
  {
    "es": "Haircut",
    "en": "Haircut",
    "de": "Haarschnitt",
    "uk": "Стрижка"
  },
  {
    "es": "Sign in",
    "en": "Sign in",
    "de": "Anmelden",
    "uk": "Увійти"
  },
  {
    "es": "Trainee",
    "en": "Trainee",
    "de": "Azubi",
    "uk": "Стажер"
  },
  {
    "es": "Payroll",
    "en": "Payroll",
    "de": "Lohnabrechnung",
    "uk": "Зарплата"
  },
  {
    "es": "Paid to",
    "en": "Paid to",
    "de": "Empfänger",
    "uk": "Кому сплачено"
  },
  {
    "es": "Barbero",
    "en": "Staff member",
    "de": "Mitarbeiter",
    "uk": "Співробітник"
  },
  {
    "es": "Horario",
    "en": "Time",
    "de": "Uhrzeit",
    "uk": "Час"
  },
  {
    "es": "viernes",
    "en": "Friday",
    "de": "Freitag",
    "uk": "п’ятниця"
  },
  {
    "es": "domingo",
    "en": "Sunday",
    "de": "Sonntag",
    "uk": "неділя"
  },
  {
    "es": "Visitas",
    "en": "Visits",
    "de": "Besuche",
    "uk": "Візити"
  },
  {
    "es": "Empezar",
    "en": "Start service",
    "de": "Behandlung beginnen",
    "uk": "Почати послугу"
  },
  {
    "es": "No vino",
    "en": "No-show",
    "de": "Nicht erschienen",
    "uk": "Не прийшов"
  },
  {
    "es": "Agendar",
    "en": "Book appointment",
    "de": "Termin buchen",
    "uk": "Створити запис"
  },
  {
    "es": "Barbero",
    "en": "Barber",
    "de": "Barbier",
    "uk": "Барбер"
  },
  {
    "es": "Cliente",
    "en": "Client",
    "de": "Kunde",
    "uk": "Клієнт"
  },
  {
    "es": "Propina",
    "en": "Tip",
    "de": "Trinkgeld",
    "uk": "Чайові"
  },
  {
    "es": "Agregar",
    "en": "Add",
    "de": "Hinzufügen",
    "uk": "Додати"
  },
  {
    "es": "Ajustes",
    "en": "Settings",
    "de": "Einstellungen",
    "uk": "Налаштування"
  },
  {
    "es": "Filtros",
    "en": "Filters",
    "de": "Filter",
    "uk": "Фільтри"
  },
  {
    "es": "Not set",
    "en": "Not set",
    "de": "Nicht eingerichtet",
    "uk": "Не налаштовано"
  },
  {
    "es": "Enabled",
    "en": "Enabled",
    "de": "Aktiviert",
    "uk": "Увімкнено"
  },
  {
    "es": "Sign in",
    "en": "Sign in",
    "de": "Anmelden",
    "uk": "Увійти"
  },
  {
    "es": "Trainee",
    "en": "Trainee",
    "de": "Azubi",
    "uk": "Стажер"
  },
  {
    "es": "Allowed",
    "en": "Allowed",
    "de": "Erlaubt",
    "uk": "Дозволено"
  },
  {
    "es": "booking",
    "en": "booking",
    "de": "Termin",
    "uk": "запис"
  },
  {
    "es": "No-show",
    "en": "No-show",
    "de": "Nicht erschienen",
    "uk": "Не прийшов"
  },
  {
    "es": "booking",
    "en": "booking",
    "de": "Termin",
    "uk": "запис"
  },
  {
    "es": "Cartera",
    "en": "Client portfolio",
    "de": "Kundenstamm",
    "uk": "Клієнтська база"
  },
  {
    "es": "Canales",
    "en": "Channels",
    "de": "Kanäle",
    "uk": "Канали"
  },
  {
    "es": "Probalo",
    "en": "Try it",
    "de": "Ausprobieren",
    "uk": "Спробувати"
  },
  {
    "es": "Gastado",
    "en": "Spent",
    "de": "Ausgegeben",
    "uk": "Витрачено"
  },
  {
    "es": "visitas",
    "en": "visits",
    "de": "Besuche",
    "uk": "відвідувань"
  },
  {
    "es": "Sellado",
    "en": "Stamped",
    "de": "Abgestempelt",
    "uk": "Штамп поставлено"
  },
  {
    "es": "A pagar",
    "en": "To pay",
    "de": "Zu zahlen",
    "uk": "До виплати"
  },
  {
    "es": "Product",
    "en": "Product",
    "de": "Produkt",
    "uk": "Товар"
  },
  {
    "es": "Arrived",
    "en": "Arrived",
    "de": "Erschienen",
    "uk": "Прийшов"
  },
  {
    "es": "Regular",
    "en": "Regular",
    "de": "Stammkunde",
    "uk": "Постійний"
  },
  {
    "es": "No show",
    "en": "No show",
    "de": "Nicht erschienen",
    "uk": "Не з’явився"
  },
  {
    "es": "Trainee",
    "en": "Trainee",
    "de": "Azubi",
    "uk": "Стажер"
  },
  {
    "es": "No-show",
    "en": "No-show",
    "de": "Nicht erschienen",
    "uk": "Не прийшов"
  },
  {
    "es": "1 visit",
    "en": "1 visit",
    "de": "1 Besuch",
    "uk": "1 відвідування"
  },
  {
    "es": "Propina",
    "en": "Tip",
    "de": "Trinkgeld",
    "uk": "Чайові"
  },
  {
    "es": "Crédito",
    "en": "Credit card",
    "de": "Kreditkarte",
    "uk": "Кредитна картка"
  },
  {
    "es": "Sueldos",
    "en": "Staff payouts",
    "de": "Mitarbeiterauszahlungen",
    "uk": "Виплати майстрам"
  },
  {
    "es": "Para mí",
    "en": "For me",
    "de": "Für mich",
    "uk": "Для мене"
  },
  {
    "es": "Cercano",
    "en": "Friendly",
    "de": "Freundlich",
    "uk": "Дружній"
  },
  {
    "es": "Trámite",
    "en": "Personal errand",
    "de": "Privater Termin",
    "uk": "Особисті справи"
  },
  {
    "es": "¡Listo!",
    "en": "Done!",
    "de": "Fertig!",
    "uk": "Готово!"
  },
  {
    "es": "Tu seña",
    "en": "Your deposit",
    "de": "Deine Anzahlung",
    "uk": "Ваша передоплата"
  },
  {
    "es": "ese día",
    "en": "that day",
    "de": "an diesem Tag",
    "uk": "того дня"
  },
  {
    "es": "propina",
    "en": "tip",
    "de": "Trinkgeld",
    "uk": "чайові"
  },
  {
    "es": "le toca",
    "en": "payout",
    "de": "Auszahlung",
    "uk": "належить"
  },
  {
    "es": "Pausado",
    "en": "Paused",
    "de": "Pausiert",
    "uk": "Призупинено"
  },
  {
    "es": "Agenda",
    "en": "Schedule",
    "de": "Kalender",
    "uk": "Календар"
  },
  {
    "es": "Equipo",
    "en": "Team",
    "de": "Team",
    "uk": "Команда"
  },
  {
    "es": "Editar",
    "en": "Edit",
    "de": "Bearbeiten",
    "uk": "Редагувати"
  },
  {
    "es": "Volver",
    "en": "Back",
    "de": "Zurück",
    "uk": "Назад"
  },
  {
    "es": "Cerrar",
    "en": "Close",
    "de": "Schließen",
    "uk": "Закрити"
  },
  {
    "es": "Buscar",
    "en": "Search",
    "de": "Suchen",
    "uk": "Пошук"
  },
  {
    "es": "Quedan",
    "en": "There are",
    "de": "Es bleiben",
    "uk": "Залишилось"
  },
  {
    "es": "gastos",
    "en": "expenses",
    "de": "Ausgaben",
    "uk": "витрати"
  },
  {
    "es": "Seña ·",
    "en": "Deposit ·",
    "de": "Anzahlung ·",
    "uk": "Передоплата ·"
  },
  {
    "es": " turno",
    "en": " booking",
    "de": " Termin",
    "uk": " запис"
  },
  {
    "es": "Turno ",
    "en": "Booking ",
    "de": "Termin ",
    "uk": "Запис "
  },
  {
    "es": " dueño",
    "en": " owner",
    "de": " Inhaber",
    "uk": " власник"
  },
  {
    "es": "Dueño ",
    "en": "Owner ",
    "de": "Inhaber ",
    "uk": "Власник "
  },
  {
    "es": "mañana",
    "en": "tomorrow",
    "de": "morgen",
    "uk": "завтра"
  },
  {
    "es": "¡Hola ",
    "en": "Hi ",
    "de": "Hallo ",
    "uk": "Привіт "
  },
  {
    "es": "Listo,",
    "en": "Done,",
    "de": "Fertig,",
    "uk": "Готово,"
  },
  {
    "es": "Corte ",
    "en": "Visit ",
    "de": "Besuch ",
    "uk": "Візит "
  },
  {
    "es": "martes",
    "en": "Tuesday",
    "de": "Dienstag",
    "uk": "вівторок"
  },
  {
    "es": "jueves",
    "en": "Thursday",
    "de": "Donnerstag",
    "uk": "четвер"
  },
  {
    "es": "sábado",
    "en": "Saturday",
    "de": "Samstag",
    "uk": "субота"
  },
  {
    "es": "Cobrar",
    "en": "Charge",
    "de": "Abrechnen",
    "uk": "Розрахувати"
  },
  {
    "es": "(seña ",
    "en": "(deposit ",
    "de": "(Anzahlung ",
    "uk": "(передоплата "
  },
  {
    "es": "tiene ",
    "en": "has ",
    "de": "hat ",
    "uk": "має "
  },
  {
    "es": "Monday",
    "en": "Monday",
    "de": "Montag",
    "uk": "понеділок"
  },
  {
    "es": "Friday",
    "en": "Friday",
    "de": "Freitag",
    "uk": "п’ятниця"
  },
  {
    "es": "Sunday",
    "en": "Sunday",
    "de": "Sonntag",
    "uk": "неділя"
  },
  {
    "es": "August",
    "en": "August",
    "de": "August",
    "uk": "Серпень"
  },
  {
    "es": "Junior",
    "en": "Junior",
    "de": "Junior-Barbier",
    "uk": "Молодший барбер"
  },
  {
    "es": "Senior",
    "en": "Senior",
    "de": "Senior-Barbier",
    "uk": "Старший барбер"
  },
  {
    "es": "Entrar",
    "en": "Sign in",
    "de": "Anmelden",
    "uk": "Увійти"
  },
  {
    "es": "Nombre",
    "en": "Name",
    "de": "Name",
    "uk": "Ім’я"
  },
  {
    "es": "Precio",
    "en": "Price",
    "de": "Preis",
    "uk": "Ціна"
  },
  {
    "es": "Mañana",
    "en": "Tomorrow",
    "de": "Morgen",
    "uk": "Завтра"
  },
  {
    "es": "Semana",
    "en": "Week",
    "de": "Woche",
    "uk": "Тиждень"
  },
  {
    "es": "martes",
    "en": "Tuesday",
    "de": "Dienstag",
    "uk": "вівторок"
  },
  {
    "es": "jueves",
    "en": "Thursday",
    "de": "Donnerstag",
    "uk": "четвер"
  },
  {
    "es": "sábado",
    "en": "Saturday",
    "de": "Samstag",
    "uk": "субота"
  },
  {
    "es": "Última",
    "en": "Last",
    "de": "Letzter",
    "uk": "Останній"
  },
  {
    "es": "Origen",
    "en": "Source",
    "de": "Herkunft",
    "uk": "Джерело"
  },
  {
    "es": "ORIGEN",
    "en": "SOURCE",
    "de": "HERKUNFT",
    "uk": "ДЖЕРЕЛО"
  },
  {
    "es": "Nuevo:",
    "en": "New:",
    "de": "Neu:",
    "uk": "Новий:"
  },
  {
    "es": "Bebida",
    "en": "Drink",
    "de": "Getränk",
    "uk": "Напій"
  },
  {
    "es": "Cobrar",
    "en": "Charge",
    "de": "Abrechnen",
    "uk": "Розрахувати"
  },
  {
    "es": "Editar",
    "en": "Edit",
    "de": "Bearbeiten",
    "uk": "Редагувати"
  },
  {
    "es": "Equipo",
    "en": "Team",
    "de": "Team",
    "uk": "Команда"
  },
  {
    "es": "Ventas",
    "en": "Sales",
    "de": "Verkäufe",
    "uk": "Продажі"
  },
  {
    "es": "Gastos",
    "en": "Expenses",
    "de": "Ausgaben",
    "uk": "Витрати"
  },
  {
    "es": "Filtro",
    "en": "Filter",
    "de": "Filter",
    "uk": "Фільтр"
  },
  {
    "es": "Barber",
    "en": "Barber",
    "de": "Barbier",
    "uk": "Барбер"
  },
  {
    "es": "Closed",
    "en": "Closed",
    "de": "Geschlossen",
    "uk": "Зачинено"
  },
  {
    "es": "Unpaid",
    "en": "Unpaid",
    "de": "Nicht bezahlt",
    "uk": "Не оплачено"
  },
  {
    "es": "Enviar",
    "en": "Send",
    "de": "Senden",
    "uk": "Надіслати"
  },
  {
    "es": "Cobros",
    "en": "Payments",
    "de": "Zahlungen",
    "uk": "Оплати"
  },
  {
    "es": "Pagado",
    "en": "Paid",
    "de": "Bezahlt",
    "uk": "Оплачено"
  },
  {
    "es": "Amount",
    "en": "Amount",
    "de": "Betrag",
    "uk": "Сума"
  },
  {
    "es": "Ticket",
    "en": "Ticket",
    "de": "Bon",
    "uk": "Чек"
  },
  {
    "es": "Nuevos",
    "en": "New clients",
    "de": "Neue Kunden",
    "uk": "Нові клієнти"
  },
  {
    "es": "Cargar",
    "en": "Add expense",
    "de": "Ausgabe hinzufügen",
    "uk": "Додати витрату"
  },
  {
    "es": "Activo",
    "en": "Active",
    "de": "Aktiv",
    "uk": "Активний"
  },
  {
    "es": "Pausar",
    "en": "Pause",
    "de": "Pausieren",
    "uk": "Призупинити"
  },
  {
    "es": "chairs",
    "en": "chairs",
    "de": "Arbeitsplätze",
    "uk": "робочі місця"
  },
  {
    "es": "Junior",
    "en": "Junior",
    "de": "Junior-Barbier",
    "uk": "Молодший барбер"
  },
  {
    "es": "Barber",
    "en": "Barber",
    "de": "Barbier",
    "uk": "Барбер"
  },
  {
    "es": "Senior",
    "en": "Senior",
    "de": "Senior-Barbier",
    "uk": "Старший барбер"
  },
  {
    "es": "Served",
    "en": "Served",
    "de": "Abgeschlossen",
    "uk": "Завершено"
  },
  {
    "es": "Gastos",
    "en": "Expenses",
    "de": "Ausgaben",
    "uk": "Витрати"
  },
  {
    "es": "Débito",
    "en": "Debit card",
    "de": "Debitkarte",
    "uk": "Дебетова картка"
  },
  {
    "es": "Custom",
    "en": "Custom",
    "de": "Eigener Zeitraum",
    "uk": "Свій період"
  },
  {
    "es": "Model:",
    "en": "Model:",
    "de": "Modell:",
    "uk": "Модель:"
  },
  {
    "es": "Copied",
    "en": "Copied",
    "de": "Kopiert",
    "uk": "Скопійовано"
  },
  {
    "es": "Médico",
    "en": "Medical",
    "de": "Arzt",
    "uk": "Лікар"
  },
  {
    "es": "sellos",
    "en": "stamps",
    "de": "Stempel",
    "uk": "відміток"
  },
  {
    "es": "Cuándo",
    "en": "When",
    "de": "Wann",
    "uk": "Коли"
  },
  {
    "es": "Plata",
    "en": "Finance",
    "de": "Finanzen",
    "uk": "Фінанси"
  },
  {
    "es": "Salir",
    "en": "Log out",
    "de": "Abmelden",
    "uk": "Вийти"
  },
  {
    "es": "Todos",
    "en": "All",
    "de": "Alle",
    "uk": "Усі"
  },
  {
    "es": "Todas",
    "en": "All",
    "de": "Alle",
    "uk": "Усі"
  },
  {
    "es": "¡Hola",
    "en": "Hi",
    "de": "Hallo",
    "uk": "Привіт"
  },
  {
    "es": "Entró",
    "en": "Received",
    "de": "Eingang",
    "uk": "Надійшло"
  },
  {
    "es": "Tenés",
    "en": "You have",
    "de": "Du hast",
    "uk": "У вас є"
  },
  {
    "es": "tiene",
    "en": "has",
    "de": "hat",
    "uk": "має"
  },
  {
    "es": "Desde",
    "en": "From",
    "de": "Von",
    "uk": "З"
  },
  {
    "es": "Hasta",
    "en": "To",
    "de": "Bis",
    "uk": "До"
  },
  {
    "es": "Corte",
    "en": "Haircut",
    "de": "Haarschnitt",
    "uk": "Стрижка"
  },
  {
    "es": "Corte",
    "en": "Haircut",
    "de": "Haarschnitt",
    "uk": "Стрижка"
  },
  {
    "es": "lunes",
    "en": "Monday",
    "de": "Montag",
    "uk": "понеділок"
  },
  {
    "es": "Today",
    "en": "Today",
    "de": "Heute",
    "uk": "Сьогодні"
  },
  {
    "es": "March",
    "en": "March",
    "de": "März",
    "uk": "Березень"
  },
  {
    "es": "April",
    "en": "April",
    "de": "April",
    "uk": "Квітень"
  },
  {
    "es": "Corte",
    "en": "Haircut",
    "de": "Haarschnitt",
    "uk": "Стрижка"
  },
  {
    "es": "Fecha",
    "en": "Date",
    "de": "Datum",
    "uk": "Дата"
  },
  {
    "es": "Notas",
    "en": "Notes",
    "de": "Notizen",
    "uk": "Нотатки"
  },
  {
    "es": "lunes",
    "en": "Monday",
    "de": "Montag",
    "uk": "понеділок"
  },
  {
    "es": "ahora",
    "en": "now",
    "de": "jetzt",
    "uk": "зараз"
  },
  {
    "es": "Panel",
    "en": "Admin panel",
    "de": "Verwaltung",
    "uk": "Адмінпанель"
  },
  {
    "es": "Nuevo",
    "en": "New",
    "de": "Neu",
    "uk": "Новий"
  },
  {
    "es": "Total",
    "en": "Total",
    "de": "Gesamt",
    "uk": "Разом"
  },
  {
    "es": "Cobro",
    "en": "Payment",
    "de": "Zahlung",
    "uk": "Оплата"
  },
  {
    "es": "Fecha",
    "en": "Date",
    "de": "Datum",
    "uk": "Дата"
  },
  {
    "es": "Dueño",
    "en": "Owner",
    "de": "Inhaber",
    "uk": "Власник"
  },
  {
    "es": "Stock",
    "en": "Stock",
    "de": "Bestand",
    "uk": "Залишки"
  },
  {
    "es": "Phone",
    "en": "Phone",
    "de": "Telefon",
    "uk": "Телефон"
  },
  {
    "es": "Apply",
    "en": "Apply",
    "de": "Anwenden",
    "uk": "Застосувати"
  },
  {
    "es": "Admin",
    "en": "Admin",
    "de": "Verwaltung",
    "uk": "Адміністрування"
  },
  {
    "es": "Today",
    "en": "Today",
    "de": "Heute",
    "uk": "Сьогодні"
  },
  {
    "es": "staff",
    "en": "staff",
    "de": "Mitarbeitende",
    "uk": "співробітники"
  },
  {
    "es": "Sales",
    "en": "Sales",
    "de": "Verkäufe",
    "uk": "Продажі"
  },
  {
    "es": "Stock",
    "en": "Stock",
    "de": "Bestand",
    "uk": "Залишки"
  },
  {
    "es": "Staff",
    "en": "Staff",
    "de": "Mitarbeiter",
    "uk": "Майстри"
  },
  {
    "es": "Monto",
    "en": "Amount",
    "de": "Betrag",
    "uk": "Сума"
  },
  {
    "es": "Entra",
    "en": "Starts",
    "de": "Beginnt",
    "uk": "Починає"
  },
  {
    "es": "La IA",
    "en": "AI",
    "de": "KI",
    "uk": "AI"
  },
  {
    "es": "libre",
    "en": "Available",
    "de": "Frei",
    "uk": "Вільний"
  },
  {
    "es": "Otros",
    "en": "Other",
    "de": "Sonstiges",
    "uk": "Інше"
  },
  {
    "es": "Vales",
    "en": "Advances",
    "de": "Vorschüsse",
    "uk": "Аванси"
  },
  {
    "es": "Dueño",
    "en": "Owner",
    "de": "Inhaber",
    "uk": "Власник"
  },
  {
    "es": "dueño",
    "en": "owner",
    "de": "Inhaber",
    "uk": "власник"
  },
  {
    "es": "Entró",
    "en": "Received",
    "de": "Eingang",
    "uk": "Надійшло"
  },
  {
    "es": "fondo",
    "en": "float",
    "de": "Startbestand",
    "uk": "залишок"
  },
  {
    "es": "Caja",
    "en": "Cash",
    "de": "Kasse",
    "uk": "Каса"
  },
  {
    "es": " hoy",
    "en": " today",
    "de": " heute",
    "uk": " сьогодні"
  },
  {
    "es": "Hoy ",
    "en": "Today ",
    "de": "Heute ",
    "uk": "Сьогодні "
  },
  {
    "es": "¡Sí!",
    "en": "Yes!",
    "de": "Ja!",
    "uk": "Так!"
  },
  {
    "es": "Tips",
    "en": "Tips",
    "de": "Trinkgeld",
    "uk": "Чайові"
  },
  {
    "es": "June",
    "en": "June",
    "de": "Juni",
    "uk": "Червень"
  },
  {
    "es": "July",
    "en": "July",
    "de": "Juli",
    "uk": "Липень"
  },
  {
    "es": "Sale",
    "en": "Sale",
    "de": "Verkauf",
    "uk": "Продаж"
  },
  {
    "es": "ayer",
    "en": "yesterday",
    "de": "gestern",
    "uk": "вчора"
  },
  {
    "es": "Pago",
    "en": "Payment",
    "de": "Zahlung",
    "uk": "Оплата"
  },
  {
    "es": "Hora",
    "en": "Time",
    "de": "Uhrzeit",
    "uk": "Час"
  },
  {
    "es": "unit",
    "en": "unit",
    "de": "Einheit",
    "uk": "од."
  },
  {
    "es": "Note",
    "en": "Note",
    "de": "Notiz",
    "uk": "Примітка"
  },
  {
    "es": "Tips",
    "en": "Tips",
    "de": "Trinkgeld",
    "uk": "Чайові"
  },
  {
    "es": "Paid",
    "en": "Paid",
    "de": "Bezahlt",
    "uk": "Оплачено"
  },
  {
    "es": "From",
    "en": "From",
    "de": "Von",
    "uk": "З"
  },
  {
    "es": "Save",
    "en": "Save",
    "de": "Speichern",
    "uk": "Зберегти"
  },
  {
    "es": "Week",
    "en": "Week",
    "de": "Woche",
    "uk": "Тиждень"
  },
  {
    "es": "Paid",
    "en": "Paid",
    "de": "Bezahlt",
    "uk": "Оплачено"
  },
  {
    "es": "Dura",
    "en": "Duration",
    "de": "Dauer",
    "uk": "Тривалість"
  },
  {
    "es": "Tono",
    "en": "Tone",
    "de": "Tonfall",
    "uk": "Тон спілкування"
  },
  {
    "es": "Tipo",
    "en": "Type",
    "de": "Typ",
    "uk": "Тип"
  },
  {
    "es": "Menu",
    "en": "Menu",
    "de": "Menü",
    "uk": "Меню"
  },
  {
    "es": "Year",
    "en": "Year",
    "de": "Jahr",
    "uk": "Рік"
  },
  {
    "es": "Duró",
    "en": "Duration",
    "de": "Dauer",
    "uk": "Тривалість"
  },
  {
    "es": "Hoy",
    "en": "Today",
    "de": "Heute",
    "uk": "Сьогодні"
  },
  {
    "es": "Más",
    "en": "More",
    "de": "Mehr",
    "uk": "Ще"
  },
  {
    "es": "hoy",
    "en": "today",
    "de": "heute",
    "uk": "сьогодні"
  },
  {
    "es": "Día",
    "en": "Day",
    "de": "Tag",
    "uk": "День"
  },
  {
    "es": "el ",
    "en": "on ",
    "de": "am ",
    "uk": "у "
  },
  {
    "es": "De ",
    "en": "From ",
    "de": "Von ",
    "uk": "З "
  },
  {
    "es": " a ",
    "en": " to ",
    "de": " bis ",
    "uk": " до "
  },
  {
    "es": "Más",
    "en": "More",
    "de": "Mehr",
    "uk": "Ще"
  },
  {
    "es": "May",
    "en": "May",
    "de": "Mai",
    "uk": "Травень"
  },
  {
    "es": "Sun",
    "en": "Sun",
    "de": "So",
    "uk": "Нд"
  },
  {
    "es": "Mon",
    "en": "Mon",
    "de": "Mo",
    "uk": "Пн"
  },
  {
    "es": "Tue",
    "en": "Tue",
    "de": "Di",
    "uk": "Вт"
  },
  {
    "es": "Wed",
    "en": "Wed",
    "de": "Mi",
    "uk": "Ср"
  },
  {
    "es": "Thu",
    "en": "Thu",
    "de": "Do",
    "uk": "Чт"
  },
  {
    "es": "Fri",
    "en": "Fri",
    "de": "Fr",
    "uk": "Пт"
  },
  {
    "es": "Sat",
    "en": "Sat",
    "de": "Sa",
    "uk": "Сб"
  },
  {
    "es": "Día",
    "en": "Day",
    "de": "Tag",
    "uk": "День"
  },
  {
    "es": "Mes",
    "en": "Month",
    "de": "Monat",
    "uk": "Місяць"
  },
  {
    "es": "Lun",
    "en": "Mon",
    "de": "Mo",
    "uk": "Пн"
  },
  {
    "es": "Mar",
    "en": "Tue",
    "de": "Di",
    "uk": "Вт"
  },
  {
    "es": "Mié",
    "en": "Wed",
    "de": "Mi",
    "uk": "Ср"
  },
  {
    "es": "Jue",
    "en": "Thu",
    "de": "Do",
    "uk": "Чт"
  },
  {
    "es": "Vie",
    "en": "Fri",
    "de": "Fr",
    "uk": "Пт"
  },
  {
    "es": "Sáb",
    "en": "Sat",
    "de": "Sa",
    "uk": "Сб"
  },
  {
    "es": "Dom",
    "en": "Sun",
    "de": "So",
    "uk": "Нд"
  },
  {
    "es": "SKU",
    "en": "SKU",
    "de": "Artikelnummer",
    "uk": "Артикул"
  },
  {
    "es": "pcs",
    "en": "pcs",
    "de": "Stück",
    "uk": "шт."
  },
  {
    "es": "Day",
    "en": "Day",
    "de": "Tag",
    "uk": "День"
  },
  {
    "es": "New",
    "en": "New",
    "de": "Neu",
    "uk": "Новий"
  },
  {
    "es": "con",
    "en": "with",
    "de": "bei",
    "uk": "із"
  },
  {
    "es": "Thu",
    "en": "Thu",
    "de": "Do",
    "uk": "Чт"
  },
  {
    "es": "Wed",
    "en": "Wed",
    "de": "Mi",
    "uk": "Ср"
  },
  {
    "es": "Fri",
    "en": "Fri",
    "de": "Fr",
    "uk": "Пт"
  },
  {
    "es": "Sat",
    "en": "Sat",
    "de": "Sa",
    "uk": "Сб"
  },
  {
    "es": "Sun",
    "en": "Sun",
    "de": "So",
    "uk": "Нд"
  },
  {
    "es": "Mon",
    "en": "Mon",
    "de": "Mo",
    "uk": "Пн"
  },
  {
    "es": "Tue",
    "en": "Tue",
    "de": "Di",
    "uk": "Вт"
  },
  {
    "es": "min",
    "en": "min",
    "de": "Min.",
    "uk": "хв"
  },
  {
    "es": "de",
    "en": "from",
    "de": "von",
    "uk": "з"
  },
  {
    "es": "To",
    "en": "To",
    "de": "Bis",
    "uk": "До"
  },
  {
    "es": "El local abre",
    "en": "Business opens",
    "de": "Öffnet um",
    "uk": "Заклад відкривається"
  },
  {
    "es": "El local cierra",
    "en": "Business closes",
    "de": "Schließt um",
    "uk": "Заклад зачиняється"
  },
  {
    "es": "Paso de la cuadrícula del calendario",
    "en": "Calendar grid interval",
    "de": "Kalenderintervall",
    "uk": "Крок сітки календаря"
  },
  {
    "es": "Cada 15 minutos",
    "en": "Every 15 minutes",
    "de": "Alle 15 Minuten",
    "uk": "Кожні 15 хвилин"
  },
  {
    "es": "Cada 30 minutos",
    "en": "Every 30 minutes",
    "de": "Alle 30 Minuten",
    "uk": "Кожні 30 хвилин"
  },
  {
    "es": "Permitir turnos superpuestos para el equipo",
    "en": "Allow overlapping appointments for staff",
    "de": "Überlappende Termine für das Team erlauben",
    "uk": "Дозволити накладання записів для команди"
  },
  {
    "es": "Sólo el personal del panel puede usarlos. La reserva pública sigue bloqueando las horas ya ocupadas.",
    "en": "Only panel staff can use this option. Public booking still blocks occupied times.",
    "de": "Nur das Team im Verwaltungsbereich kann diese Option nutzen. Öffentliche Buchungen bleiben für belegte Zeiten gesperrt.",
    "uk": "Цю опцію може використовувати лише команда панелі. Публічний запис і далі блокує зайнятий час."
  },
  {
    "es": "Configuración del calendario guardada",
    "en": "Calendar settings saved",
    "de": "Kalendereinstellungen gespeichert",
    "uk": "Налаштування календаря збережено"
  },
  {
    "es": "Guardar configuración",
    "en": "Save settings",
    "de": "Einstellungen speichern",
    "uk": "Зберегти налаштування"
  },
  {
    "es": "Staff schedule",
    "en": "Staff schedule",
    "de": "Mitarbeiterplan",
    "uk": "Графік працівників"
  },
  {
    "es": "Opening hours and calendar grid",
    "en": "Opening hours and calendar grid",
    "de": "Öffnungszeiten und Kalender-Raster",
    "uk": "Години роботи та сітка календаря"
  },
  {
    "es": "Revisá la persona y la fecha.",
    "en": "Check the staff member and date.",
    "de": "Prüfe die Person und das Datum.",
    "uk": "Перевірте працівника й дату."
  },
  {
    "es": "Elegí hasta tres franjas dentro del horario del local",
    "en": "Choose up to three shifts within the business hours",
    "de": "Wähle bis zu drei Schichten innerhalb der Öffnungszeiten",
    "uk": "Оберіть до трьох змін у межах годин роботи закладу"
  },
  {
    "es": "Las franjas de una misma fecha no pueden pisarse.",
    "en": "Shifts on the same date cannot overlap.",
    "de": "Schichten am selben Tag dürfen sich nicht überschneiden.",
    "uk": "Зміни в один день не можуть перетинатися."
  },
  {
    "es": "Revisá el horario del local.",
    "en": "Check the business hours.",
    "de": "Prüfe die Öffnungszeiten.",
    "uk": "Перевірте години роботи закладу."
  },
  {
    "es": "El paso de la cuadrícula debe ser de 15 o 30 minutos.",
    "en": "The calendar interval must be 15 or 30 minutes.",
    "de": "Das Kalenderintervall muss 15 oder 30 Minuten betragen.",
    "uk": "Крок сітки має бути 15 або 30 хвилин."
  }
] as const

export function normalizeLocale(value:string|null|undefined):Locale{const v=(value||"").toLowerCase();if(v.startsWith("de"))return"de";if(v.startsWith("uk")||v.startsWith("ua"))return"uk";return"en"}
type Pair={source:string;target:string}
const spanishEntries:Pair[]=[...ROWS].filter(r=>String(r.es)!==String(r.en)).map(r=>({source:r.es,target:r.en})).sort((a,b)=>b.source.length-a.source.length)
const localeEntries:Record<"de"|"uk",Pair[]>={
  de:[...ROWS].filter(r=>String(r.en)!==String(r.de)).map(r=>({source:r.en,target:r.de})).sort((a,b)=>b.source.length-a.source.length),
  uk:[...ROWS].filter(r=>String(r.en)!==String(r.uk)).map(r=>({source:r.en,target:r.uk})).sort((a,b)=>b.source.length-a.source.length),
}
type PhraseRow={es:string;en:string;de:string;uk:string}
const dictionary:readonly PhraseRow[]=ROWS
const exactEnglish=new Map<string,PhraseRow>()
const exactSpanish=new Map<string,PhraseRow>()
for(const row of dictionary){
  if(!exactEnglish.has(row.en))exactEnglish.set(row.en,row)
  if(!exactSpanish.has(row.es))exactSpanish.set(row.es,row)
}
function form(n:number,one:string,few:string,many:string):string{
  const last=n%10,ten=n%100
  return ten>=11&&ten<=14?many:last===1?one:last>=2&&last<=4?few:many
}
const MONTHS_UK:Record<string,string>={
  Січень:"січня",Лютий:"лютого",Березень:"березня",Квітень:"квітня",
  Травень:"травня",Червень:"червня",Липень:"липня",Серпень:"серпня",
  Вересень:"вересня",Жовтень:"жовтня",Листопад:"листопада",Грудень:"грудня",
}
const SHORT_MONTHS:Record<string,[string,string]>={
  Jan:["Jan.","січня"],Feb:["Feb.","лютого"],Mar:["März","березня"],Apr:["Apr.","квітня"],
  May:["Mai","травня"],Jun:["Juni","червня"],Jul:["Juli","липня"],Aug:["Aug.","серпня"],
  Sep:["Sept.","вересня"],Oct:["Okt.","жовтня"],Nov:["Nov.","листопада"],Dec:["Dez.","грудня"]
}
function grammar(text:string,locale:Locale){
  let out=calendarDateText(text,locale)
  if(locale==="de"||locale==="uk"){
    out=out.replace(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g,
      (_whole,d,month)=>d+" "+SHORT_MONTHS[month][locale==="de"?0:1])
  }
  if(locale==="en"){
    out=out.replace(/\b1\s+bookings\b/g,"1 booking")
      .replace(/\b1\s+visits\b/g,"1 visit")
      .replace(/\b1\s+services\b/g,"1 service")
      .replace(/\b1\s+clients\b/g,"1 client")
    return out
  }
  if(locale==="de"){
    out=out.replace(/\b(Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)(?:,\s*|\s+)(\d{1,2})\s+(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\b/g,
      (_full,day,date,month)=>day+", "+date+". "+month)
    out=out.replace(/\b1\s+Termine\b/g,"1 Termin")
      .replace(/\b1\s+Besuche\b/g,"1 Besuch")
      .replace(/\b1\s+Leistungen\b/g,"1 Leistung")
      .replace(/\b1\s+Kunden\b/g,"1 Kunde")
    return out
  }
  out=out.replace(/(Понеділок|Вівторок|Середа|Четвер|П’ятниця|П'ятниця|Субота|Неділя)\s+(\d{1,2})\s+([А-Яа-яІіЇїЄєҐґ]+)(?=$|[^\p{L}])/gu,
    (_full,day,date,month)=>day+", "+date+" "+month.toLocaleLowerCase("uk"))
  out=out.replace(/\b(\d{1,2})\s+(Січень|Лютий|Березень|Квітень|Травень|Червень|Липень|Серпень|Вересень|Жовтень|Листопад|Грудень)(?=$|[^\p{L}])/gu,
    (_full,d,month)=>d+" "+MONTHS_UK[month])
  const endings:[string,string,string,string][]=[
    ["записів","запис","записи","записів"],
    ["записи","запис","записи","записів"],
    ["відвідувань","відвідування","відвідування","відвідувань"],
    ["відвідування","відвідування","відвідування","відвідувань"],
    ["послуг","послуга","послуги","послуг"],
    ["послуги","послуга","послуги","послуг"],
    ["оплат","оплата","оплати","оплат"],
    ["оплати","оплата","оплати","оплат"],
    ["клієнти","клієнт","клієнти","клієнтів"],
    ["співробітники","співробітник","співробітники","співробітників"],
  ]
  for(const [word,one,few,many] of endings){
    out=out.replace(new RegExp("(\\d+)\\s+"+word+"(?=$|[^А-Яа-яІіЇїЄєҐґ])","g"),
      (_full,number)=>number+" "+form(Number(number),one,few,many))
  }
  return out
}

const DAY_ALIASES:Record<string,number>={}
const DAY_GROUPS=[
  ["sunday","sun","domingo","dom","sonntag","so","неділя","нд"],
  ["monday","mon","lunes","lun","montag","mo","понеділок","пн"],
  ["tuesday","tue","martes","mar","dienstag","di","вівторок","вт"],
  ["wednesday","wed","miércoles","miercoles","mié","mie","mittwoch","mi","середа","ср"],
  ["thursday","thu","jueves","jue","donnerstag","do","четвер","чт"],
  ["friday","fri","viernes","vie","freitag","fr","п’ятниця","п'ятниця","пт"],
  ["saturday","sat","sábado","sabado","sáb","sab","samstag","sa","субота","сб"],
]
for(let i=0;i<DAY_GROUPS.length;i++)for(const alias of DAY_GROUPS[i])DAY_ALIASES[alias]=i
const SHORT_DAYS=new Set(["sun","dom","so","нд","mon","lun","mo","пн","tue","mar","di","вт","wed","mié","mie","mi","ср","thu","jue","do","чт","fri","vie","fr","пт","sat","sáb","sab","sa","сб"])
const MONTH_GROUPS=[
  {aliases:["january","jan","enero","ene","januar","січень","січня","січ"],en:"January",enShort:"Jan",de:"Januar",deShort:"Jan.",uk:"січень",ukGen:"січня",ukShort:"січ."},
  {aliases:["february","feb","febrero","feb","februar","лютий","лютого","лют"],en:"February",enShort:"Feb",de:"Februar",deShort:"Feb.",uk:"лютий",ukGen:"лютого",ukShort:"лют."},
  {aliases:["march","mar","marzo","märz","март","березень","березня","бер"],en:"March",enShort:"Mar",de:"März",deShort:"März",uk:"березень",ukGen:"березня",ukShort:"бер."},
  {aliases:["april","apr","abril","abr","квітень","квітня","квіт"],en:"April",enShort:"Apr",de:"April",deShort:"Apr.",uk:"квітень",ukGen:"квітня",ukShort:"квіт."},
  {aliases:["may","mayo","mai","травень","травня","трав"],en:"May",enShort:"May",de:"Mai",deShort:"Mai",uk:"травень",ukGen:"травня",ukShort:"трав."},
  {aliases:["june","jun","junio","juni","червень","червня","черв"],en:"June",enShort:"Jun",de:"Juni",deShort:"Juni",uk:"червень",ukGen:"червня",ukShort:"черв."},
  {aliases:["july","jul","julio","juli","липень","липня","лип"],en:"July",enShort:"Jul",de:"Juli",deShort:"Juli",uk:"липень",ukGen:"липня",ukShort:"лип."},
  {aliases:["august","aug","agosto","серпень","серпня","серп"],en:"August",enShort:"Aug",de:"August",deShort:"Aug.",uk:"серпень",ukGen:"серпня",ukShort:"серп."},
  {aliases:["september","sept","sep","septiembre","setiembre","вересень","вересня","вер"],en:"September",enShort:"Sep",de:"September",deShort:"Sept.",uk:"вересень",ukGen:"вересня",ukShort:"вер."},
  {aliases:["october","oct","octubre","oktober","okt","жовтень","жовтня","жовт"],en:"October",enShort:"Oct",de:"Oktober",deShort:"Okt.",uk:"жовтень",ukGen:"жовтня",ukShort:"жовт."},
  {aliases:["november","nov","noviembre","листопад","листопада","лист"],en:"November",enShort:"Nov",de:"November",deShort:"Nov.",uk:"листопад",ukGen:"листопада",ukShort:"лист."},
  {aliases:["december","dec","diciembre","dezember","dez","грудень","грудня","груд"],en:"December",enShort:"Dec",de:"Dezember",deShort:"Dez.",uk:"грудень",ukGen:"грудня",ukShort:"груд."},
]
const MONTH_ALIASES:Record<string,number>={}
for(let i=0;i<MONTH_GROUPS.length;i++)for(const alias of MONTH_GROUPS[i].aliases)MONTH_ALIASES[alias]=i
const SHORT_MONTH_ALIASES=new Set(["jan","ene","feb","mar","abr","apr","jun","jul","ago","aug","sep","sept","oct","okt","nov","dez","dec","січ","лют","бер","квіт","трав","черв","лип","серп","вер","жовт","лист","груд"])
const DAY_FORMS=[
  {en:["Sunday","Sun"],de:["Sonntag","So."],uk:["неділя","нд"]},
  {en:["Monday","Mon"],de:["Montag","Mo."],uk:["понеділок","пн"]},
  {en:["Tuesday","Tue"],de:["Dienstag","Di."],uk:["вівторок","вт"]},
  {en:["Wednesday","Wed"],de:["Mittwoch","Mi."],uk:["середа","ср"]},
  {en:["Thursday","Thu"],de:["Donnerstag","Do."],uk:["четвер","чт"]},
  {en:["Friday","Fri"],de:["Freitag","Fr."],uk:["п’ятниця","пт"]},
  {en:["Saturday","Sat"],de:["Samstag","Sa."],uk:["субота","сб"]},
]
const escapeRegex=(value:string)=>value.replace(/[.*+?^$(){}|[\]\\]/g,"\\const cache=new Map<string,string>()")
const tokenPattern=(tokens:string[])=>tokens.sort((a,b)=>b.length-a.length).map(escapeRegex).join("|")
const DATE_DAYS=tokenPattern(Object.keys(DAY_ALIASES))+"\\.?"
const DATE_MONTHS=tokenPattern(Object.keys(MONTH_ALIASES))+"\\.?"
function cleanCalendarPunctuation(text:string,locale:Locale){
  return locale==="uk"?text.replace(/(\d{1,2}\s+(?:січ|лют|бер|квіт|трав|черв|лип|серп|вер|жовт|лист|груд)\.)\./gu,"$1"):text
}
function dateWord(value:string){return value.toLocaleLowerCase("uk").replace(/\./g,"")}
function calendarDateText(value:string,locale:Locale):string{
  let out=value
  const datePattern=new RegExp("(?<![\\p{L}])("+DATE_DAYS+")(,\\s*,?\\s*|\\s+)(\\d{1,2})(?:\\s+(?:de|of|from|von|vom|з|із))?\\s+("+DATE_MONTHS+")(?:\\s+(\\d{4}))?(?!\\d)","giu")
  out=out.replace(datePattern,(_all,dayRaw,separator,dayNumber,monthRaw,year)=>{
    const dayKey=dateWord(dayRaw),monthKey=dateWord(monthRaw)
    const dayIndex=DAY_ALIASES[dayKey],monthIndex=MONTH_ALIASES[monthKey]
    if(dayIndex===undefined||monthIndex===undefined)return _all
    const short=SHORT_DAYS.has(dayKey)||SHORT_MONTH_ALIASES.has(monthKey)
    const day=DAY_FORMS[dayIndex][locale][short?1:0]
    const month=MONTH_GROUPS[monthIndex]
    if(locale==="de")return day+", "+dayNumber+". "+(short?month.deShort:month.de)+(year?" "+year:"")
    if(locale==="uk")return day+", "+dayNumber+" "+(short?month.ukShort:month.ukGen)+(year?" "+year:"")
    return day+", "+dayNumber+" "+(short?month.enShort:month.en)+(year?" "+year:"")
  })
  const monthDayPattern=new RegExp("(?<![\\p{L}\\p{N}])(\\d{1,2})(\\s+)("+DATE_MONTHS+")(?![\\p{L}])","giu")
  out=out.replace(monthDayPattern,(_all,dayNumber,space,monthRaw)=>{
    const monthIndex=MONTH_ALIASES[dateWord(monthRaw)]
    if(monthIndex===undefined)return _all
    const month=MONTH_GROUPS[monthIndex],short=SHORT_MONTH_ALIASES.has(dateWord(monthRaw))
    if(locale==="de")return dayNumber+". "+(short?month.deShort:month.de)
    if(locale==="uk")return dayNumber+" "+(short?month.ukShort:month.ukGen)
    return dayNumber+" "+(short?month.enShort:month.en)
  })
  const monthYearPattern=new RegExp("(?<![\\p{L}\\p{N}])("+DATE_MONTHS+")\\s+(\\d{4})(?!\\d)","giu")
  out=out.replace(monthYearPattern,(_all,monthRaw,year)=>{
    const month=MONTH_GROUPS[MONTH_ALIASES[dateWord(monthRaw)]]
    if(!month)return _all
    const label=locale==="de"?month.de:locale==="uk"?month.uk:month.en
    return label.charAt(0).toLocaleUpperCase(locale==="uk"?"uk":locale==="de"?"de":"en")+label.slice(1)+" "+year
  })
  return out
}

const cache=new Map<string,string>()
function replaceOnce(input:string,pairs:Pair[]):string{
  let text=input
  const replacements:string[]=[]
  // Every partial match must be bounded at the start/end of a whole word.
  // Never change fragments of employee names, "commission" or service titles.
  const escapePattern=(value:string)=>value.replace(/[.*+?^$()|[\]{}\\]/g,"\\$&")
  for(const {source,target} of pairs){
    if(!source||source.length<2||!text.includes(source))continue
    const mark=()=>String.fromCharCode(0xe000)+(replacements.push(target)-1)+String.fromCharCode(0xe001)
    const startsWord=/^[\p{L}\p{N}]/u.test(source)
    const endsWord=/[\p{L}\p{N}]$/u.test(source)
    const left=startsWord?"(?<![\\p{L}\\p{N}])":""
    const right=endsWord?"(?![\\p{L}\\p{N}])":""
    const regex=new RegExp(left+escapePattern(source)+right,"gu")
    text=text.replace(regex,mark)
  }
  return text.replace(/\uE000(\d+)\uE001/g,(_whole,i)=>replacements[Number(i)]||"")
}
export function translateText(value:string,locale:Locale):string{
  if(!value||!value.trim())return value
  const key=locale+"\0"+value
  const known=cache.get(key)
  if(known!==undefined)return known
  const middle=value.trim()
  // Business brands and customer/staff names are user data, never interface copy.
  if(["Mercado Pago","WhatsApp","Instagram","Zernio","Railway","GitHub"].includes(middle))return value
  const exact=exactEnglish.get(middle)||exactSpanish.get(middle)
  if(!exact && /^[\p{Lu}][\p{L}'’-]+(?:\s+[\p{Lu}][\p{L}'’-]+){1,4}$/u.test(middle))return value
  if(exact){
    const translated=locale==="en"?exact.en:locale==="de"?exact.de:exact.uk
    const first=value.indexOf(middle)
    const final=value.slice(0,first)+translated+value.slice(first+middle.length)
    const answer=cleanCalendarPunctuation(grammar(final,locale),locale)
    if(cache.size>2400)cache.clear()
    cache.set(key,answer)
    return answer
  }
  const canonical=replaceOnce(value,spanishEntries)
  const output=cleanCalendarPunctuation(grammar(locale==="en"?canonical:replaceOnce(canonical,localeEntries[locale]),locale),locale)
  if(cache.size>2400)cache.clear()
  cache.set(key,output)
  return output
}
export const t=(value:string,locale:Locale)=>translateText(value,locale)

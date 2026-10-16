import { useEffect, useMemo, useState } from 'react';
import { capitalize, formatDate } from '../../lib/dates.js';
import { price } from '../../lib/format.js';
import { services, stylists } from './config.js';
import { createBooking, listBookingsBetween } from './mockApi.js';
import { bookableDays, freeSlots, isOpen, serviceById, worksOn } from './slots.js';

// All the booking logic (steps, free times, validation, sending) without any markup.
// The three salon designs (A, B, C) each draw their own booking screens on top of it.
// Steps: 0 service · 1 stylist · 2 day and time · 3 contact details.

export const ANY = 'any';
export const stylistById = (id) => stylists.find((s) => s.id === id);
const emptyDetails = { name: '', phone: '', privacy: false };

export default function useBooking() {
  const days = useMemo(bookableDays, []);
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(null);
  const [who, setWho] = useState(ANY);
  const [date, setDate] = useState(() => days.find(isOpen));
  const [time, setTime] = useState(null);
  const [details, setDetails] = useState(emptyDetails);
  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState(null); // existing bookings for all bookable days; null = loading
  const [reload, setReload] = useState(0);
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const service = serviceById(serviceId, services);

  // Load the bookings of every bookable day once, so we can tell which days are full.
  const choosingTime = step >= 2;
  useEffect(() => {
    if (!choosingTime) return;
    let current = true;
    setBookings(null);
    listBookingsBetween(days[0], days.at(-1)).then((list) => current && setBookings(list));
    return () => {
      current = false;
    };
  }, [choosingTime, reload]); // eslint-disable-line react-hooks/exhaustive-deps

  // Free times per day for the chosen service and stylist.
  const slotsByDay = useMemo(() => {
    if (!bookings || !service) return null;
    const now = new Date();
    return Object.fromEntries(days.map((d) => [d, freeSlots(d, service.duration, bookings.filter((b) => b.date === d), who, now)]));
  }, [bookings, service, who, days]);

  // Why a day can't be picked ('cerrado', 'descansa', 'completo'), or null if it can.
  const unavailable = (d) => {
    if (!isOpen(d)) return 'cerrado';
    if (who !== ANY && !worksOn(stylistById(who), d)) return 'descansa';
    if (slotsByDay && slotsByDay[d].length === 0) return 'completo';
    return null;
  };
  const slots = slotsByDay?.[date] ?? null;

  // If the selected day stops being available (full, or the stylist is off), jump to the next one.
  useEffect(() => {
    if (step === 2 && unavailable(date)) {
      const next = days.find((d) => !unavailable(d));
      if (next) setDate(next);
    }
  }, [step, date, slotsByDay, who]); // eslint-disable-line react-hooks/exhaustive-deps

  const pickService = (id) => { setServiceId(id); setTime(null); setStep(1); };
  const pickWho = (id) => { setWho(id); setTime(null); setStep(2); };
  const pickDate = (d) => { setDate(d); setTime(null); setNotice(''); };
  const pickTime = (t) => { setTime(t); setNotice(''); setStep(3); };

  // Start with a service and/or stylist already chosen ("Reservar con Lucía", "Reservar mechas"…).
  const preset = ({ serviceId: s = null, who: w = ANY } = {}) => {
    setConfirmed(null);
    setServiceId(s);
    setWho(w);
    setTime(null);
    setNotice('');
    setStep(!s ? 0 : w === ANY ? 1 : 2);
  };

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setDetails((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!details.name.trim()) found.name = 'Dinos tu nombre.';
    if (!/^\+?[\d\s-]{9,}$/.test(details.phone.trim())) found.phone = 'Revisa el teléfono, parece incompleto.';
    if (!details.privacy) found.privacy = 'Necesitamos que aceptes la política de privacidad.';
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    try {
      const created = await createBooking({ serviceId, stylistId: who, date, start: time, name: details.name.trim(), phone: details.phone.trim() });
      setConfirmed(created);
      setDetails(emptyDetails);
    } catch (err) {
      setNotice(err.message);
      setTime(null);
      setStep(2);
      setReload((r) => r + 1);
    } finally {
      setSending(false);
    }
  };

  const restart = () => preset();

  // One line per answered step: '[Corte mujer · 45 min · 28 €, Con Carmen, Martes, 21 de octubre a las 10:30]'
  const summaries = [
    service && `${service.name} · ${service.duration} min · ${price(service.price)}`,
    who === ANY ? 'Con quien esté libre' : `Con ${stylistById(who).name}`,
    time && `${capitalize(formatDate(date))} a las ${time}`,
  ];

  return {
    days, step, setStep, service, serviceId, who, date, time, slots, unavailable, notice,
    details, errors, update, submit, sending, confirmed, summaries,
    pickService, pickWho, pickDate, pickTime, preset, restart,
  };
}

// What, when and with whom for a confirmed booking, plus the WhatsApp text to change it.
export function describeBooking(booking) {
  const service = serviceById(booking.serviceId, services);
  const stylist = stylistById(booking.stylistId);
  return {
    service,
    stylist,
    when: `${capitalize(formatDate(booking.date))} a las ${booking.start}`,
    changeMessage: `Hola, soy ${booking.name}. Tengo cita el ${formatDate(booking.date)} a las ${booking.start} (${service.name} con ${stylist.name}) y necesito cambiarla.`,
  };
}

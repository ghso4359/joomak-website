import React, { useState } from "react";
import { MapPin, Phone, Clock, ChevronRight, Check, X, Instagram } from "lucide-react";
import { supabase } from "../supabase";
import mainBanner from "../assets/주막실내사진.JPG";
import menu1 from "../assets/메뉴1.png";
import menu2 from "../assets/메뉴2.png";


console.log(supabase);

type Page = "home" | "reservation" | "menu" | "admin";

const RESTAURANT = {
  name: "JOOMAK Chatswood",
  tagline: "Korean flavours, late-night drinks, and good times",
  address: "Unit 7/18-26 Anderson St, Chatswood NSW 2067",
  phone: "(02) 8317 6996",

  hours: {
    EveryDay: "Mon – Sun 5:00 pm – 1:00 am",
  },

  intro:
    "Joomak is a place to enjoy good Korean food, drinks, and late nights with friends. From comforting classics to dishes made for sharing, we want every visit to feel relaxed, welcoming, and full of good food.",
};

const TIME_SLOTS = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
];

function Nav({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {
  const [open, setOpen] = useState(false);

 const links: { label: string; id: Page }[] = [
  { label: "Home", id: "home" },
  { label: "Menu", id: "menu" },
];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Restaurant name */}
        <button
          onClick={() => setPage("home")}
          className="font-['Playfair_Display'] text-xl font-semibold tracking-wide text-foreground hover:opacity-70 transition-opacity"
        >
          {RESTAURANT.name}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`font-['Jost'] text-sm tracking-widest uppercase transition-colors ${
                page === l.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}

          {/* Instagram */}
          <a
            href="https://www.instagram.com/joomakchatswood_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center justify-center text-foreground hover:text-accent transition-colors"
          >
            <Instagram size={20} />
          </a>

          {/* Book button */}
          <button
            onClick={() => setPage("reservation")}
            className="ml-2 px-5 py-2 bg-foreground text-primary-foreground font-['Jost'] text-sm tracking-widest uppercase hover:bg-accent transition-colors"
          >
            Book a Table
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          {open ? (
            <X size={20} />
          ) : (
            <div className="flex flex-col gap-1.5">
              <span className="block w-6 h-px bg-foreground" />
              <span className="block w-6 h-px bg-foreground" />
              <span className="block w-4 h-px bg-foreground" />
            </div>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setPage(l.id);
                setOpen(false);
              }}
              className={`block w-full text-left px-6 py-4 font-['Jost'] text-sm tracking-widest uppercase border-b border-border transition-colors ${
                page === l.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}

          {/* Mobile Instagram */}
          <a
            href="https://www.instagram.com/joomakchatswood_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 border-b border-border font-['Jost'] text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground"
          >
            <Instagram size={18} />
            Instagram
          </a>

          {/* Mobile booking */}
          <button
            onClick={() => {
              setPage("reservation");
              setOpen(false);
            }}
            className="block w-full text-left px-6 py-4 bg-foreground text-white font-['Jost'] text-sm tracking-widest uppercase"
          >
            Book a Table
          </button>
        </div>
      )}
    </nav>
  );
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-end bg-neutral-900">
        <img
          src={mainBanner}
          alt="Joomak Chatswood"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full">
          <h1 className="font-['Playfair_Display'] text-6xl md:text-8xl font-medium text-white leading-[1.05] mb-8">
            {RESTAURANT.name}
          </h1>
          <p className="font-['Jost'] text-lg text-white/70 mb-10 max-w-md font-light">
            {RESTAURANT.tagline}
          </p>
          <button
            onClick={() => setPage("reservation")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-foreground font-['Jost'] text-sm tracking-widest uppercase hover:bg-accent hover:text-white transition-colors group"
          >
            Reserve a Table
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* Info strip */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="flex items-start gap-4 py-10 md:pr-10">
            <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-2">Address</p>
              <p className="font-['Jost'] text-sm leading-relaxed text-foreground">{RESTAURANT.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 py-10 md:px-10">
            <Phone size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-2">Reservations</p>
              <p className="font-['Jost'] text-sm text-foreground">{RESTAURANT.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 py-10 md:pl-10">
            <Clock size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-2">Hours</p>
              <p className="font-['Jost'] text-sm leading-relaxed text-foreground">
               {RESTAURANT.hours.EveryDay}
              </p>
            </div>
          </div>
        </div>
      </section>


{/* About */}
<section className="bg-white">
  <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
    <div>
      <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium leading-tight text-foreground mb-8">
        Good food, good drinks,
        <br />
        <span className="italic font-normal">good nights.</span>
      </h2>

      <p className="font-['Jost'] text-base leading-relaxed text-muted-foreground font-light">
        Joomak is a place to enjoy Korean food, drinks, and good times with
        friends. From comforting Korean favourites to dishes made for sharing,
        we want every visit to feel relaxed, welcoming, and enjoyable.
      </p>

      <button
        onClick={() => setPage("menu")}
        className="mt-10 inline-flex items-center gap-2 font-['Jost'] text-sm tracking-widest uppercase text-foreground border-b border-foreground pb-0.5 hover:opacity-60 transition-opacity group"
      >
        View the Menu
        <ChevronRight
          size={12}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </button>
    </div>

    <div>
      <img
        src={menu1}
        alt="JOOMAK menu"
        className="w-full h-[500px] object-cover"
      />
    </div>
  </div>
</section>
 
{/* Second image feature */}
<section className="bg-[#d8c3a5]">
  <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-12 items-center">
    <div className="md:col-span-3">
      <img
        src={menu2}
        alt="JOOMAK featured menu"
        className="w-full h-72 md:h-[420px] object-cover"
      />
    </div>

    <div className="md:col-span-2">
      <p className="font-['Jost'] text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
        Stay a Little Longer
      </p>

      <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium leading-snug text-foreground mb-6">
        Dinner, drinks, and late nights.
      </h2>

      <p className="font-['Jost'] text-sm leading-relaxed text-muted-foreground font-light mb-8">
        Good Korean food, cold drinks, and a place to enjoy the night with friends.
        We're open late, so come by whenever you're ready.
      </p>

      <button
        onClick={() => setPage("reservation")}
        className="px-7 py-3 bg-foreground text-white font-['Jost'] text-xs tracking-widest uppercase hover:opacity-80 transition-opacity"
      >
        Book a Table
      </button>
    </div>
  </div>
</section>


    </main>
  );
}
 function ReservationResultPage({
  status,
  setPage,
}: {
  status: "confirmed" | "cancelled";
  setPage: (p: Page) => void;
}) {
  const isConfirmed = status === "confirmed";

  return (
    <main className="pt-16 min-h-screen bg-[#f5f1ec] flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-white border border-[#e4ddd5] px-8 py-16 text-center">

        <div
          className={`w-14 h-14 rounded-full mx-auto mb-7 flex items-center justify-center text-2xl ${
            isConfirmed
              ? "bg-[#382a20] text-white"
              : "border border-[#382a20] text-[#382a20]"
          }`}
        >
          {isConfirmed ? "✓" : "×"}
        </div>

        <p className="font-['Jost'] text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          JOOMAK Chatswood
        </p>

        <h1 className="font-['Playfair_Display'] text-4xl font-semibold text-[#382a20] mb-5">
          {isConfirmed
            ? "Reservation Confirmed"
            : "Reservation Cancelled"}
        </h1>

        <p className="font-['Jost'] text-sm leading-relaxed text-muted-foreground font-light">
          {isConfirmed
            ? "The reservation has been confirmed successfully."
            : "The reservation has been cancelled successfully."}
        </p>

        <div className="w-12 h-px bg-[#c9b39a] mx-auto my-8" />

        <button
          onClick={() => {
            window.history.replaceState({}, "", "/");
            setPage("home");
          }}
          className="px-7 py-3 bg-[#382a20] text-white font-['Jost'] text-xs tracking-widest uppercase hover:opacity-80 transition-opacity"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}

function ReservationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    "Inside/Outside": "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [assignedSeating, setAssignedSeating] = useState("");

  const validate = () => {
    const e: Partial<typeof form> = {};

    if (!form.name.trim()) {
      e.name = "Required";
    }

    if (!form.email.includes("@")) {
      e.email = "Valid email required";
    }

    if (!form.phone.trim()) {
      e.phone = "Required";
    }

    if (!form.date) {
      e.date = "Required";
    }

    if (!form.time) {
      e.time = "Required";
    }

    if (!form["Inside/Outside"]) {
      e["Inside/Outside"] = "Please select a seating area";
    }

    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const { data, error } = await supabase.rpc(
      "create_reservation_with_capacity",
      {
        p_name: form.name,
        p_email: form.email,
        p_phone: form.phone,
        p_date: form.date,
        p_time: form.time,
        p_guests: Number(form.guests),
        p_seating: form["Inside/Outside"],
      }
    );

    if (error) {
      console.error("Reservation error:", error);
      alert("Reservation failed. Please try again.");
      return;
    }

    if (!data?.success) {
      alert(data?.message || "This time is fully booked.");
      return;
    }

    const finalSeating =
      data?.seating || form["Inside/Outside"];

    setAssignedSeating(finalSeating);

    // Email confirmation
    const { error: emailError } = await supabase.functions.invoke(
      "send-reservation-email",
      {
        body: {
          name: form.name,
          email: form.email,
          date: form.date,
          time: form.time,
          guests: form.guests,
          seating: finalSeating,
          reservation_id: data.reservation_id,
          manage_token: data.manage_token,
        },
      }
    );

    if (emailError) {
      console.error("Email error:", emailError);
    }

    setSubmitted(true);
  };

  const inputCls = (field: keyof typeof form) =>
    `w-full px-4 py-3 bg-input-background border font-['Jost'] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
      errors[field]
        ? "border-destructive"
        : "border-border focus:border-accent"
    }`;

  if (submitted) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Check size={24} className="text-accent" />
          </div>

          <h2 className="font-['Playfair_Display'] text-3xl font-medium text-foreground mb-4">
            See you soon.
          </h2>

          <p className="font-['Jost'] text-sm text-muted-foreground font-light leading-relaxed mb-2">
            We have received your reservation request for{" "}
            <span className="text-foreground font-medium">
              {form.date}
            </span>{" "}
            at{" "}
            <span className="text-foreground font-medium">
              {form.time}
            </span>
            , party of{" "}
            <span className="text-foreground font-medium">
              {form.guests}
            </span>
            .
          </p>

          <p className="font-['Jost'] text-sm text-muted-foreground font-light mb-2">
            Seating:{" "}
            <span className="text-foreground font-medium">
              {assignedSeating}
            </span>
          </p>

          <p className="font-['Jost'] text-sm text-muted-foreground font-light">
            Your reservation is pending confirmation.
            We will notify you by email once it has been confirmed.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setAssignedSeating("");

              setForm({
                name: "",
                email: "",
                phone: "",
                date: "",
                time: "",
                guests: "2",
                "Inside/Outside": "",
              });

              setErrors({});
            }}
            className="mt-8 px-7 py-3 border border-foreground text-foreground font-['Jost'] text-xs tracking-widest uppercase hover:bg-foreground hover:text-primary-foreground transition-colors"
          >
            Make Another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-0 min-h-[calc(100vh-4rem)]">

        {/* Left panel */}
        <div className="md:col-span-2 bg-[#d9c3a4] py-20 px-8 md:px-12 flex flex-col justify-between">
          <div>
            <p className="font-['Jost'] text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Reservations
            </p>

            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold leading-tight text-foreground mb-8">
              Good food,
              <br />
              Good nights.
            </h1>

            <p className="font-['Jost'] text-sm leading-relaxed text-muted-foreground font-light">
              Reserve your table for Korean food, drinks, and a good
              night with friends. We're open late, so stay as long as
              you like.
            </p>
          </div>

          <div className="mt-16 space-y-5 border-t border-border pt-8">
            <div>
              <p className="font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-1">
                Phone
              </p>

              <p className="font-['Jost'] text-sm text-foreground">
                {RESTAURANT.phone}
              </p>
            </div>

            <div>
              <p className="font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-1">
                Hours
              </p>

              <p className="font-['Jost'] text-sm text-foreground">
                {RESTAURANT.hours.EveryDay}
              </p>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="md:col-span-3 py-20 px-8 md:px-14">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-lg"
          >
            <div className="grid grid-cols-2 gap-4">

              {/* Name */}
              <div className="col-span-2">
                <label className="block font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Name{" "}
                  <span className="text-destructive">*</span>
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      name: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      name: undefined,
                    });
                  }}
                  className={inputCls("name")}
                />

                {errors.name && (
                  <p className="mt-1 font-['Jost'] text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Email{" "}
                  <span className="text-destructive">*</span>
                </label>

                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      email: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      email: undefined,
                    });
                  }}
                  className={inputCls("email")}
                />

                {errors.email && (
                  <p className="mt-1 font-['Jost'] text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Phone{" "}
                  <span className="text-destructive">*</span>
                </label>

                <input
                  type="tel"
                  placeholder="04XX XXX XXX"
                  value={form.phone}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      phone: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      phone: undefined,
                    });
                  }}
                  className={inputCls("phone")}
                />

                {errors.phone && (
                  <p className="mt-1 font-['Jost'] text-xs text-destructive">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Date{" "}
                  <span className="text-destructive">*</span>
                </label>

                <input
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      date: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      date: undefined,
                    });
                  }}
                  className={inputCls("date")}
                />

                {errors.date && (
                  <p className="mt-1 font-['Jost'] text-xs text-destructive">
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="block font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Time{" "}
                  <span className="text-destructive">*</span>
                </label>

                <select
                  value={form.time}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      time: e.target.value,
                    });

                    setErrors({
                      ...errors,
                      time: undefined,
                    });
                  }}
                  className={`${inputCls("time")} cursor-pointer`}
                >
                  <option value="">
                    Select a time
                  </option>

                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                {errors.time && (
                  <p className="mt-1 font-['Jost'] text-xs text-destructive">
                    {errors.time}
                  </p>
                )}
              </div>

              {/* Guests */}
              <div>
                <label className="block font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Guests
                </label>

                <select
                  value={form.guests}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      guests: e.target.value,
                    })
                  }
                  className={`${inputCls("guests")} cursor-pointer`}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seating */}
              <div>
                <label className="block font-['Jost'] text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Seating{" "}
                  <span className="text-destructive">*</span>
                </label>

                <select
                  value={form["Inside/Outside"]}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      "Inside/Outside": e.target.value,
                    });

                    setErrors({
                      ...errors,
                      "Inside/Outside": undefined,
                    });
                  }}
                  className={`${inputCls("Inside/Outside")} cursor-pointer`}
                >
                  <option value="">
                    Select seating
                  </option>

                  <option value="Anywhere">
                    Anywhere
                  </option>

                  <option value="Inside">
                    Inside
                  </option>

                  <option value="Outside">
                    Outside
                  </option>
                </select>

                {errors["Inside/Outside"] && (
                  <p className="mt-1 font-['Jost'] text-xs text-destructive">
                    {errors["Inside/Outside"]}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-foreground text-primary-foreground font-['Jost'] text-sm tracking-widest uppercase hover:bg-accent transition-colors"
            >
              Request Reservation
            </button>

            <p className="font-['Jost'] text-xs text-muted-foreground text-center leading-relaxed">
              Reservations are subject to confirmation.
              For groups larger than 6, please call us directly at{" "}
              {RESTAURANT.phone}.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

function MenuPage() {
  const menuSections = [
    {
      title: "Chef's Special",
      items: [
        { name: "Mala Rosé Braised Chicken", korean: "마라 로제 찜닭", price: "$52.00" },
        { name: "Korean Beef Tartare", korean: "육회", price: "$28.00" },
        { name: "Rosé Chicken Risotto", korean: "로제 치킨 리조또", price: "$29.00" },
        { name: "Braised Pork Belly & Pork Jowl", korean: "항정 삼겹 모둠수육", price: "$58.00" },
        {
          name: "Spicy Boneless Chicken Feet & Buldak Noodles",
          korean: "매운무뼈닭발 & 불닭볶음면",
          price: "$34.00",
        },
        { name: "Fish Cake Soup", korean: "오뎅탕", price: "$28.00" },
        { name: "Clam Soup", korean: "조개탕", price: "$28.00" },
      ],
    },
    {
      title: "K-Chicken",
      items: [
        { name: "Three Coloured Chicken (Boneless)", korean: "삼색 치킨", price: "$49.00" },
        { name: "Aussie's Chicken Feast", korean: "오지 치킨 플래터", price: "$49.00" },
        { name: "Snowy Cheese Chicken", korean: "눈꽃 치즈 치킨", price: "$24.00" },
        { name: "Garlic Cream Chicken", korean: "갈릭 크림 치킨", price: "$24.00" },
        { name: "Green Chilli Mayo Chicken", korean: "청양 마요 치킨", price: "$24.00" },
        { name: "Sriracha Mayo Chicken", korean: "스리라차 마요 치킨", price: "$24.00" },
        { name: "Sweet & Spicy Chicken", korean: "양념 치킨", price: "$24.00" },
        { name: "Soy Chicken", korean: "간장 치킨", price: "$24.00" },
        { name: "Original Fried Chicken", korean: "후라이드 치킨", price: "$22.00" },
        { name: "Snowy Cheesy Potato Fries", korean: "눈꽃치즈 감자튀김", price: "$16.00" },
        { name: "Potato Fries", korean: "감자튀김", price: "$11.00" },
      ],
    },
    {
      title: "Korean Hot Pot",
      items: [
        {
          name: "Korean Beef Shank & Brisket Hot Pot",
          korean: "아롱사태 양지전골",
          price: "$67.00",
        },
        {
          name: "Loaded Seafood Nagasaki Jjamppong",
          korean: "해물듬뿍 나가사끼 짬뽕탕",
          price: "$63.00",
        },
        {
          name: "Pork Back-Bone Stew with Aged Kimchi",
          korean: "묵은지 등뼈 감자탕",
          price: "$65.00",
        },
        {
          name: "Korean Braised Pork Ribs with Kimchi",
          korean: "등갈비 김치찜",
          price: "$65.00",
        },
        {
          name: "Spicy Seafood Tofu Soup with Beef Brisket",
          korean: "순두부 전골 (해물 & 차돌)",
          price: "$63.00",
        },
      ],
    },
    {
      title: "Stir-Fried",
      items: [
        { name: "Stir-Fried Bulgogi (L)", korean: "불고기철판", price: "$42.00" },
        { name: "Stir-Fried Spicy Pork (L)", korean: "제육철판", price: "$42.00" },
        { name: "Stir-Fried Webfoot Octopus (L)", korean: "쭈꾸미철판", price: "$42.00" },
        {
          name: "Stir-Fried Pork & Webfoot Octopus (L)",
          korean: "쭈삼철판",
          price: "$44.00",
        },
        { name: "Stir-Fried Cheesy Spicy Chicken", korean: "치즈불닭", price: "$38.00" },
      ],
    },
    {
      title: "Set Menu",
      items: [
        { name: "Stir-Fried Bulgogi (S)", korean: "불고기백반", price: "$25.00" },
        { name: "Stir-Fried Spicy Pork (S)", korean: "제육백반", price: "$25.00" },
        { name: "Stir-Fried Webfoot Octopus (S)", korean: "쭈꾸미백반", price: "$24.00" },
        { name: "Kimchi & Pork Stew", korean: "김치찌개백반", price: "$24.00" },
        { name: "Spicy Seafood Tofu Soup", korean: "순두부백반", price: "$25.00" },
        { name: "Soybean Paste Soup", korean: "된장찌개 백반", price: "$25.00" },
        { name: "Pork Hangover Soup", korean: "뼈해장국", price: "$27.00" },
        { name: "Beef Bone Soup", korean: "설렁탕", price: "$25.00" },
        { name: "Ginseng Chicken Soup", korean: "삼계탕", price: "$27.00" },
        { name: "Kimchi Fried Rice", korean: "김치볶음밥", price: "$24.00" },
      ],
    },
    {
      title: "Pancake",
      items: [
        { name: "Half & Half Veggie Pancake", korean: "하프앤하프 전", price: "$32.00" },
        { name: "Cheese Potato Pancake", korean: "바삭 치즈 감자전", price: "$28.00" },
        { name: "Shrimp Chive Pancake", korean: "새우 부추전", price: "$29.00" },
        { name: "Seafood Pancake", korean: "해물파전", price: "$29.00" },
        { name: "Kimchi Pancake", korean: "김치전", price: "$27.00" },
      ],
    },
    {
      title: "Side & Snacks",
      items: [
        {
          name: "Half & Half Pork Cutlet (Spicy & Cheese)",
          korean: "반반 돈까스 (스파이시 & 치즈)",
          price: "$32.00",
        },
        { name: "Tteokbokki", korean: "즉석 떡볶이", price: "$36.00" },
        { name: "Rosé Tteokbokki", korean: "로제떡볶이", price: "$39.00" },
        { name: "Assorted Tempura", korean: "모둠 튀김", price: "$18.00" },
        { name: "Steamed Egg", korean: "계란찜", price: "$18.00" },
        { name: "Corn Cheese", korean: "콘치즈", price: "$16.00" },
        { name: "Egg Cheese Volcano", korean: "에그 치즈 볼케이노", price: "$23.00" },
        { name: "Cheese Pork Cutlet", korean: "치즈 돈까스", price: "$18.00" },
        { name: "Rice Balls", korean: "셀프주먹밥", price: "$15.00" },
        { name: "Deep-Fried Dumplings", korean: "군만두", price: "$16.00" },
        { name: "Shrimp Croquette (2 pcs)", korean: "새우 고로케", price: "$12.00" },
      ],
    },
    {
      title: "Soju",
      items: [
        { name: "Chamisul", korean: "참이슬", price: "$19.00" },
        { name: "Chum-Churum", korean: "처음처럼", price: "$19.00" },
        { name: "Jin-ro", korean: "진로", price: "$19.00" },
        { name: "Sae-ro", korean: "새로", price: "$19.00" },
        { name: "Peach Soju", korean: "복숭아 소주", price: "$17.00" },
        { name: "Grape Soju", korean: "포도 소주", price: "$17.00" },
        { name: "Apple Soju", korean: "사과 소주", price: "$17.00" },
        { name: "Lychee Soju", korean: "새로 리치", price: "$17.00" },
        { name: "Yuzu Soju", korean: "유자 소주", price: "$17.00" },
        { name: "Yogurt Soju", korean: "요구르트 소주", price: "$17.00" },
      ],
    },
    {
      title: "Beer",
      items: [
        { name: "Suntory Premium Malts (Tap)", korean: "선토리 생맥주", price: "$9.00" },
        { name: "Cass", korean: "카스", price: "$7.00" },
        { name: "Kloud", korean: "클라우드", price: "$7.00" },
        { name: "Terra", korean: "테라", price: "$7.00" },
        { name: "SO-MAQ (Can)", korean: "소맥 라거", price: "$9.50" },
      ],
    },
    {
      title: "Highball",
      items: [
        {
          name: "Highball",
          korean: "하이볼 · Classic / Hibiscus / Earl Grey",
          price: "$14.00",
        },
      ],
    },
    {
      title: "Makgeolli",
      items: [
        { name: "Joomak Rice Wine", korean: "주막 막걸리", price: "$15.00" },
        { name: "Ji Pyeong Makgeolli", korean: "지평막걸리", price: "$15.00" },
        {
          name: "Chestnut Makgeolli",
          korean: "알밤 막걸리 (국순당)",
          price: "$15.00",
        },
      ],
    },
    {
      title: "Special Liquor",
      items: [
        { name: "Bokbunja", korean: "복분자", price: "$26.00" },
        { name: "Starlight Chungha", korean: "별빛청하", price: "$12.00" },
      ],
    },
    {
      title: "Combo Set",
      items: [
        {
          name: "So Maek Set",
          korean: "소맥 세트 · Any 2 Beers + 1 Soju",
          price: "$30.00",
        },
        {
          name: "Mak Sa Combo",
          korean: "막사 콤보 · 1 Makgeolli + 1 Cider",
          price: "$18.00",
        },
        {
          name: "Bok So Sa Set",
          korean: "복소사 세트 · Bokbunja + Soju + Cider",
          price: "$45.00",
        },
      ],
    },
  ];

  return (
    <main className="pt-16 min-h-screen bg-[#faf8f5]">
      <section className="border-b border-[#e7dfd7] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="font-['Jost'] text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            JOOMAK Chatswood
          </p>

          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold text-[#382a20]">
            Menu
          </h1>

          <p className="font-['Jost'] text-sm text-muted-foreground mt-4 font-light">
            Korean food, drinks, and favourites made for sharing.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-20">
          {menuSections.map((section) => (
            <div key={section.title}>
              <h2 className="font-['Playfair_Display'] text-3xl font-semibold text-[#382a20] mb-8 border-b border-[#d8c3a5] pb-4">
                {section.title}
              </h2>

              <div className="space-y-6">
                {section.items.map((item) => (
                  <div
                    key={`${section.title}-${item.name}`}
                    className="border-b border-black/5 pb-5 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <h3 className="font-['Jost'] text-sm font-medium text-[#382a20] leading-relaxed">
                          {item.name}
                        </h3>

                        <p className="font-['Jost'] text-sm text-muted-foreground mt-1 leading-relaxed">
                          {item.korean}
                        </p>
                      </div>

                      <span className="font-['Jost'] text-sm font-medium text-[#382a20] whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="border-t border-[#4a382c] bg-[#382a20] text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-['Playfair_Display'] text-2xl font-medium mb-3">{RESTAURANT.name}</p>
          <p className="font-['Jost'] text-sm text-white/50 font-light leading-relaxed">
            {RESTAURANT.tagline}
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-['Jost'] text-xs tracking-widest uppercase text-white/40 mb-4">Navigate</p>
          {(["home", "menu"] as Page[]).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="block font-['Jost'] text-sm capitalize text-white/60 hover:text-white transition-colors"
            >
              {p === "reservation" ? "Reservations" : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          <p className="font-['Jost'] text-xs tracking-widest uppercase text-white/40 mb-4">Contact</p>
          <p className="font-['Jost'] text-sm text-white/60">{RESTAURANT.address}</p>
          <p className="font-['Jost'] text-sm text-white/60">{RESTAURANT.phone}</p>
          <p className="font-['Jost'] text-sm text-white/60">{RESTAURANT.hours.EveryDay}</p>
        </div>
      </div>
      <div className="border-t border-white/10 max-w-6xl mx-auto px-6 py-6">
        <p className="font-['Jost'] text-xs text-white/30">
          © {new Date().getFullYear()} {RESTAURANT.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function AdminPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  //admin login 
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError("Invalid email or password.");
      return;
    }

    setUser(data.user);
    setLoginError("");
    await loadReservations();
  };

 //logout function 
  const logout = async () => {
  await supabase.auth.signOut();
  setUser(null);
  setReservations([]);
};

  const loadReservations = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("reservation_date", { ascending: true })
      .order("reservation_time", { ascending: true });

    if (error) {
      console.error("Load reservations error:", error);
      setLoading(false);
      return;
    }

    setReservations(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
  const { error } = await supabase
    .from("reservations")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Update status error:", error);
    alert("Failed to update reservation.");
    return;
  }

  setReservations((prev) =>
    prev.map((reservation) =>
      reservation.id === id
        ? { ...reservation, status }
        : reservation
    )
  );
};

  React.useEffect(() => {
  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setUser(data.user);
      loadReservations();
    } else {
      setLoading(false);
    }
  };

  checkUser();
}, []);

if (!user) {
  return (
    <main className="pt-24 min-h-screen bg-background">
      <div className="max-w-md mx-auto px-6 py-20">
        <h1 className="text-4xl font-semibold mb-8">
          Admin Login
        </h1>

        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3"
            required
          />

          {loginError && (
            <p className="text-red-500 text-sm">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white p-3"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

  return (
    <main className="pt-24 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
         <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-semibold">
          Reservation Admin
        </h1>

        <button
          onClick={logout}
          className="px-4 py-2 border text-sm"
        >
          Logout
        </button>
      </div>


        {loading ? (
          <p>Loading reservations...</p>
        ) : reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Time</th>
                  <th className="text-left p-3">Guests</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b">
                    <td className="p-3">{reservation.name}</td>
                    <td className="p-3">
                      {reservation.reservation_date}
                    </td>
                    <td className="p-3">
                      {reservation.reservation_time}
                    </td>
                    <td className="p-3">{reservation.guests}</td>
                    <td className="p-3">{reservation.phone}</td>
                    <td className="p-3">{reservation.status}</td>

                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            updateStatus(reservation.id, "confirmed")
                          }
                          className="px-3 py-2 bg-black text-white text-sm"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(reservation.id, "cancelled")
                          }
                          className="px-3 py-2 border text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}


export default function App() {
  const [page, setPage] = useState<Page>(() => {
  const params = new URLSearchParams(window.location.search);
  return params.get("admin") === "1" ? "admin" : "home";
});
  const params = new URLSearchParams(window.location.search);
  const reservationResult = params.get("reservation");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Nav page={page} setPage={setPage} />
      <div className="flex-1">
  {reservationResult === "confirmed" ? (
    <ReservationResultPage
      status="confirmed"
      setPage={setPage}
    />
  ) : reservationResult === "cancelled" ? (
    <ReservationResultPage
      status="cancelled"
      setPage={setPage}
    />
  ) : (
    <>
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "reservation" && <ReservationPage />}
      {page === "menu" && <MenuPage />}
      {page === "admin" && <AdminPage />}
    </>
  )}
</div>
      <Footer setPage={setPage} />
    </div>
  );
}
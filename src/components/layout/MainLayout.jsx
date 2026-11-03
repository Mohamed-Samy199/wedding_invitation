// inert = true أثناء ظهور البوابة، لمنع التنقل بالكيبورد خلفها
export default function MainLayout({ children, inert = false, mainRef }) {
  return (
    <main ref={mainRef} className="min-h-screen bg-[#f7f2eb] text-[#302924]" inert={inert}>
      {children}
    </main>
  );
}

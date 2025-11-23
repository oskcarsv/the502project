export default function Home() {
  return (
    <main className="min-h-screen bg-black text-blue-400 font-mono flex items-center justify-center p-4">
      <div className="max-w-3xl">
        <div className="mb-8">
          <span className="text-gray-500">~/the502project</span>
          <span className="text-white ml-2">$</span>
          <span className="ml-2 animate-pulse">_</span>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-2xl md:text-3xl font-bold mb-8">
            {'>'} The 502 Project
          </p>

          <p>
            Queremos potencializar <span className="text-white font-bold">Guatemala como referente de tecnología</span>.
          </p>

          <p>
            Creemos que desde Guatemala podemos hacer <span className="text-white font-bold">tecnología de nivel mundial</span>.
          </p>

          <p>
            No importa si sos técnico o no, si estás creando, experimentando, o apenas aprendiendo.
          </p>

          <p>
            Este es el espacio donde los <span className="text-white">emprendedores</span>, <span className="text-white">founders</span> y <span className="text-white">builders</span> de Guatemala se juntan y construyen.
          </p>

          <div className="mt-12 pt-8 border-t border-blue-900">
            <p className="mb-4">Únete a la comunidad:</p>
            <a
              href="https://chat.whatsapp.com/JNvMJwm9Y0aDOBEQj3sFkM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border-2 border-blue-400 hover:bg-blue-400 hover:text-black transition-all duration-200 font-bold"
            >
              {'>'} WhatsApp Community
            </a>
          </div>

          <p className="mt-8 text-sm text-gray-600">
            Hagamos el cambio. Juntos.
          </p>
        </div>
      </div>
    </main>
  );
}

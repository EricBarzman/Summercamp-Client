"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
  // Accéder aux paramètres de recherche par l'URL
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // Création d'un handler de recherche debounced
  // qui s'active 300ms after que l'utilisateur cesse sa recherche
  const handleSearch = useDebouncedCallback((term: string) => {
    
    // Créer un nouveau paramètre de recherche URL avec l'actuel
    const params = new URLSearchParams(searchParams);
    
    // Retourner à la page 1 dès que les paramètres de recherche changent
    params.set("page", "1");
    // Update les search params selon le terme de recherche
    if (term) params.set("query", term);
    else params.delete("query");

    // Update l'URL selon les params sans rafraichir la page
    replace(`${pathname}?${params.toString()}`, { scroll : false });
  }, 300);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
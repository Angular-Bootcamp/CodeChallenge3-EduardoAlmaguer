using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pokedex.Models
{
    public class Pokemon
    {
        public int id { get; set; }
        public string name { get; set; }
        public PokemonSprites sprites { get; set; }
        public PokemonSlot[] types { get; set; }
        //public int Number { get; set; }
        public int height { get; set; }
        public int weight { get; set; }


    }

    public class PokemonSprites
    {
        public string back_female { get; set; }
        public string back_shiny_female { get; set; }
        public string back_default { get; set; }
        public string front_female { get; set; }
        public string front_shiny_female { get; set; }
        public string back_shiny { get; set; }
        public string front_default { get; set; }
        public string front_shiny { get; set; }
    }

    public class PokemonSlot
    {
        public string slot { get; set; }
        public PokemonType type{get;set;}
    }

    public class PokemonType
    {
        public string type { get; set; }
        public string name { get; set; }
    }
}
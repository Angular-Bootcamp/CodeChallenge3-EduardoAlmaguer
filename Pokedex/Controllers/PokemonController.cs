using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using System.Threading;
using PokeAPI;
using Newtonsoft.Json;





namespace Pokedex.Controllers
{
    public class PokemonController : Controller
    {

        public async Task<JsonResult> Get(int id)
        {

            var pokemons = await DataFetcher.GetApiObject<Pokemon>(id);
             
            var pokemon = await DataFetcher.GetApiObject<PokemonSpecies>(id);
            var Descripcion = pokemon.FlavorTexts.FirstOrDefault(o => o.Language.Name.Equals("en") && o.Version.Name.Equals("red")).FlavorText;
            var dt = Config.Server.Query("pokemongetbynumber", id).Tables[0];
            var row = dt.Rows[0];

            var p = new
            {
                name = row["name"] as string,
                types = JObject.Parse(row["types"] as string).ToString(),
                image = row["image"] as string,
                number = (int)row["number"]
            };
            return Json(p, JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> GetAll()
        {
            var list = new List<object>();


            //var pokemonSpecies = await DataFetcher.GetApiObject<PokemonSpecies>(id);
            var dt = Config.Server.Query("pokemonlistbynumberrange", 1, 151).Tables[0];
            foreach (System.Data.DataRow row in dt.Rows)
            {

                try
                {
                    string name = row["name"] as string;
                    var types = JsonConvert.DeserializeObject<string[]>(row["types"] as string);
                    string image = row["image"] as string;
                    var number = row["number"];
                    var description = row["descripcion"] as string;
                    var height = row["height"] as string;
                    var weight = row["weight"] as string;
                    var hidden = row["hidden"] as string;
                    var evolutionchain = row["evolutionchain"] as string != null? JsonConvert.DeserializeObject<int[]>(row["evolutionchain"] as string) : null;
                    var p = new
                    {
                        name = name,
                        types = types,
                        image = image,
                        number = number,
                        description = description,
                        height = height,
                        weight = weight,
                        hidden = hidden,
                        evolutionchain= evolutionchain
                    };
                    list.Add(p);
                }
                catch (Exception e)
                {
                    throw e;
                }
            }



            //var pokemonSpecies = await DataFetcher.GetApiObject<PokemonSpecies>(id);

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        
        //public async Task<ContentResult> Save()
        //{
        //    var dt = Config.Server.Query("pokemonlistbynumberrange", 11, 151).Tables[0];
        //    foreach (System.Data.DataRow row in dt.Rows)
        //    {
        //        var json = row["data"] as string;
        //        var poke = JsonConvert.DeserializeObject<Models.Pokemon>(json);

        //        var pokemon = await DataFetcher.GetApiObject<Pokemon>(poke.id);


        //        var Abbility = pokemon.Abilities.FirstOrDefault(o => o.IsHidden);
        //        var hidden = Abbility.Ability == null ? string.Empty : Abbility.Ability.Name;

        //        Config.Server.Execute("pokemonupdate",poke.id, hidden);
        //    }

        //    return new ContentResult();
        //}
    }
}
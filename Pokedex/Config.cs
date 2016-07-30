using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Helpers.DB.Mysql;
using System.Configuration;

namespace Pokedex
{
    public class Config
    {
        private static MysqlServer server;

        public static MysqlServer Server
        {
            get
            {
                if (server == null)
                {
                    var Conn= ConfigurationManager.ConnectionStrings["Pokedex"].ConnectionString;
                    server = new MysqlServer(Conn);
                }
                    
                return server;
            }
        }
    }
}
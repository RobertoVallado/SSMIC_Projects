using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;

namespace ConsoleAppSQL_sample
{
    class Program
    {
        static void Main(string[] args)
        {
            string connectionString = @"Data Source=ITM-LTP-8\SQLEXPRESS01;
                                        Initial Catalog=example;
                                        User ID=rvallado;
                                        Password=;
                                        Trusted_Connection=Yes;"; //arbitrary string values that SQL will check for

            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open(); //it opens the connection using the @values
            Debug.WriteLine("Connected to the server!");
            SqlCommand command = new SqlCommand(); 
            command.Connection = connection;
            command.CommandType = CommandType.Text;
            command.CommandText = "SELECT * FROM dbo.People"; //basic SQL syntax
            SqlDataReader reader = command.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    Debug.WriteLine(reader.GetString(1) + "-" + reader.GetString(2));
                }
            }
            connection.Close();
           /*NOTE: most of the dot elements are built-ins from the 'Data.SqlClient' namespace*/
        }
    }
}

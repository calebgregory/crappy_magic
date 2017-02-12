defmodule Store.Datasource do
  @doc"""
  Reads file (declared in `config/config.exs`), parses it to map
  from string `slug` => `%{}`.
  """
  require CSV

  def init do
    csvStream =
      Application.get_env(:store, :store_csv)
      |> File.stream!

    if valid?(csvStream) do
      items = csvStream |> to_map
      {:ok, items}
    else
      {:error, :invalid_csv}
    end
  end

  defp headers do
    [
      :slug,
      :title,
      :owner_name,
      :owner_email,
      :video_filename,
      :video_creator_name,
      :video_creator_web_address,
      :video_creator_email,
      :video_creator_instagram_handle,
      :price,
      :description,
      :materials,
      :manufacture_info,
      :mature_content
    ]
  end

  defp valid?(stream) do
    stream
    |> CSV.Decoder.decode(separator: ?|)
    |> Enum.at(0) # take first row
    |> Enum.zip(headers()) # zip with `headers`
    |> Enum.all?(fn {str, atm} -> str == to_string(atm) end) # check all of them are same
  end

  defp to_map(stream) do
    stream
    |> CSV.Decoder.decode(separator: ?|, headers: headers())
    |> Enum.reduce(%{}, fn(item, acc) -> Map.put(acc, item.slug, item) end)
  end
end

defmodule Something do
  require CSV

  def init do
    csvStream =
      Application.get_env(:store, :store_csv)
      |> File.stream!

    if valid?(csvStream) do
      data = csvStream |> to_map
      data
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
    |> Enum.at(0)
    |> Enum.zip(headers())
    |> Enum.all?(fn {str, atm} -> str == to_string(atm) end)
  end

  defp to_map(stream) do
    stream
    |> CSV.Decoder.decode(separator: ?|, headers: headers())
    |> Enum.reduce(%{}, fn(item, acc) -> Map.put(acc, item.slug, item) end)
  end
end

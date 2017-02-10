defmodule Store.Bucket do
  @moduledoc """
  Stores the Items in memory and provides access to these.
  """

  require CSV

  @doc"""
  Starts a new bucket which holds data populated by the configured csv file.

  Validates csv. If invalid, returns `{:error, :invalid_csv}`
  """
  def start_link do
    csvStream =
      Application.get_env(:store, :store_csv)
      |> File.stream!

    if valid?(csvStream) do
      data = csvStream |> to_map
      Agent.start_link(fn -> data end)
    else
      {:error, :invalid_csv}
    end
  end

  @doc """
  Gets item at key `slug` in `bucket`.
  """
  def get(bucket, slug) do
    Agent.get(bucket, &Map.get(&1, slug))
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
    CSV.Decoder.decode(stream, separator: ?|)
    |> Enum.at(0)
    |> Enum.zip(headers())
    |> Enum.all?(fn {str, atm} -> str == to_string(atm) end)
  end

  def to_map(stream) do
    stream |>
    CSV.Decoder.decode(separator: ?|, headers: headers())
    Enum.reduce(%{}, fn(item, acc) -> Map.put(acc, item.slug, item) end)
  end
end

defmodule Store.Bucket do
  @moduledoc"""
  Stores an Item in memory and provides access to it.
  """

  @doc"""
  Starts a new Agent which holds a new map
  """
  def start_link(name, items) do
    Agent.start_link(fn -> items end, name: name)
  end

  @doc"""
  Gets item at key `slug` in `bucket`.
  """
  def get(bucket, slug) do
    Agent.get(bucket, &Map.fetch(&1, slug))
  end
end

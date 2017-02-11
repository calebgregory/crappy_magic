defmodule Store.Bucket do
  @moduledoc """
  Stores an Item in memory and provides access to it.
  """

  @doc"""
  Starts a new Agent which holds a new map
  """
  def start_link(name, items) do
    Agent.start_link(fn -> items end, name: name)
  end

  @doc """
  Gets item at key `slug` in `bucket`.
  """
  def get(bucket, slug) do
    Agent.get(bucket, &Map.get(&1, slug))
  end

  @doc """
  Puts an item at key `slug` in `bucket`
  """
  def put(bucket, slug, item) do
    Agent.update(bucket, &Map.put(&1, slug, item))
  end
end

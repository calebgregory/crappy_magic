defmodule Store do
  @moduledoc"""
  Application root.
  """
  use Application

  @doc"""
  Gets `items` from Store.Datasource, starts Store.Bucket.Supervisor with
  `items`.
  """
  def start(_type, _args) do
    {:ok, items} = Store.Datasource.init
    Store.Bucket.Supervisor.start_link(items)
  end
end

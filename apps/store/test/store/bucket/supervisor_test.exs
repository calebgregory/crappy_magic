defmodule Store.Bucket.SupervisorTest do
  use ExUnit.Case, async: true
  doctest Store.Bucket.Supervisor

  setup do
    items = %{"420" => %{slug: "420", h: "t"}}
    {:ok, sup} = Store.Bucket.Supervisor.start_link(items)
    [{_, pid, _, _}] = Supervisor.which_children(sup)
    {:ok, bucket: pid, items: items, sup: sup}
  end

  test "inits with child Store.Bucket", %{items: items} do
    assert Store.Bucket.get(Store.Bucket, "420") == Map.fetch(items, "420")
  end

  test "restarts child if child stops", %{bucket: bucket, items: items, sup: sup} do
    Agent.stop(bucket)

    # Wait until the bucket is dead
    ref = Process.monitor(bucket)
    assert_receive {:DOWN, ^ref, _, _, _}

    # Bogus call to sup; blocks until Supervisor is ready
    [_] = Supervisor.which_children(sup)
    assert Store.Bucket.get(Store.Bucket, "420") == Map.fetch(items, "420")
  end

  test "restarts child if child crashes", %{bucket: bucket, items: items, sup: sup} do
    # Stop the bucket with non-normal reason
    Process.exit(bucket, :shutdown)

    # Wait until the bucket is dead
    ref = Process.monitor(bucket)
    assert_receive {:DOWN, ^ref, _, _, _}

    # Bogus call to sup; blocks until Supervisor is ready
    [_] = Supervisor.which_children(sup)
    assert Store.Bucket.get(Store.Bucket, "420") == Map.fetch(items, "420")
  end
end
